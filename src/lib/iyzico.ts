/**
 * Iyzico Payment Gateway Integration
 * Handles payment processing, checkout, and webhook verification
 */

import crypto from 'crypto';

export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface BuyerInfo {
  id: string;
  name: string;
  surname: string;
  email: string;
  identityNumber: string;
  registrationAddress: string;
  city: string;
  country: string;
  ip: string;
}

export interface PaymentItem {
  id: string;
  name: string;
  category1: string;
  itemType: string;
  price: string;
}

export interface PaymentRequest {
  locale: 'tr' | 'en';
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: 'TRY' | 'USD' | 'EUR';
  basketId: string;
  paymentGroup: 'PRODUCT' | 'LISTING' | 'SUBSCRIPTION';
  callbackUrl: string;
  enabledInstallments: number[];
  buyer: BuyerInfo;
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
  };
  basketItems: PaymentItem[];
}

export interface PaymentResponse {
  status: 'success' | 'failure';
  locale: string;
  systemTime: number;
  conversationId: string;
  token?: string;
  paymentPageUrl?: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

export interface PaymentCallback {
  status: 'success' | 'failure';
  locale: string;
  systemTime: number;
  conversationId: string;
  paymentId: string;
  price: string;
  paidPrice: string;
  currency: string;
  installment: number;
  basketId: string;
  paymentStatus: string;
  fraudStatus: number;
  merchantCommissionRate: string;
  merchantCommissionRateAmount: string;
  iyziCommissionRateAmount: string;
  iyziCommissionFee: string;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  binNumber: string;
  lastFourDigits: string;
  basketItemId: string;
  buyer: BuyerInfo;
}

class IyzicoClient {
  private config: IyzicoConfig;

  constructor(config: IyzicoConfig) {
    this.config = config;
  }

  /**
   * Generate authorization header
   * Iyzico signature format: HMAC-SHA256(randomString + endpoint + body, secretKey)
   */
  private generateAuthString(endpoint: string, body: string, randomString: string): string {
    // Iyzico requires: randomString + endpoint + body (in this exact order)
    const dataToSign = randomString + endpoint + body;
    
    const hash = crypto
      .createHmac('sha256', this.config.secretKey)
      .update(dataToSign, 'utf8')
      .digest('base64');

    return `IYZWS ${this.config.apiKey}:${hash}:${randomString}`;
  }

  /**
   * Generate random string for authorization
   */
  private generateRandomString(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Make API request to Iyzico
   */
  private async request<T>(endpoint: string, body: any): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const bodyString = JSON.stringify(body);
    
    // Generate random string once and use it for both signature and header
    const randomString = this.generateRandomString();
    
    // Iyzico signature uses endpoint path (not full URL)
    const authString = this.generateAuthString(endpoint, bodyString, randomString);

    // Debug logging (remove in production)
    if (this.config.apiKey.includes('sandbox')) {
      console.log('Iyzico Request Debug:', {
        endpoint,
        randomString,
        bodyLength: bodyString.length,
        apiKey: this.config.apiKey.substring(0, 10) + '...',
        hasSecretKey: !!this.config.secretKey
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authString,
        'x-iyzi-rnd': randomString,
      },
      body: bodyString,
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      const text = await response.text();
      console.error('Failed to parse Iyzico response as JSON:', text);
      throw new Error(`Iyzico API returned invalid JSON: ${response.status} ${response.statusText}`);
    }
    
    // Check if Iyzico returned an error
    if (responseData.status === 'failure' || !response.ok) {
      console.error('Iyzico API error response:', {
        status: responseData.status,
        errorCode: responseData.errorCode,
        errorMessage: responseData.errorMessage,
        errorGroup: responseData.errorGroup,
        httpStatus: response.status,
        httpStatusText: response.statusText
      });
      
      const errorMessage = responseData.errorMessage || responseData.errorCode || response.statusText || 'Unknown error';
      const error = new Error(`Iyzico API error: ${errorMessage}`);
      (error as any).iyzicoError = responseData;
      throw error;
    }

    return responseData as T;
  }

  /**
   * Initialize checkout payment
   */
  async initializeCheckout(request: PaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/payment/iyzipos/checkoutform/initialize/auth/ecom', request);
  }

  /**
   * Retrieve payment result
   */
  async retrievePayment(token: string, locale: 'tr' | 'en' = 'tr'): Promise<PaymentCallback> {
    return this.request<PaymentCallback>('/payment/iyzipos/checkoutform/auth/ecom/detail', {
      locale,
      token,
    });
  }

  /**
   * Verify webhook signature
   */
  verifyWebhook(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.config.secretKey)
      .update(payload)
      .digest('base64');

    return signature === expectedSignature;
  }

  /**
   * Calculate platform commission (15%) and artist payout (85%)
   */
  calculateCommissions(amount: number): { platform: number; artist: number } {
    const platform = Math.round(amount * 0.15 * 100) / 100;
    const artist = Math.round(amount * 0.85 * 100) / 100;
    return { platform, artist };
  }
}

/**
 * Initialize Iyzico client
 */
export function createIyzicoClient(env: any): IyzicoClient {
  // Use provided keys or fallback to defaults
  const apiKey = env.IYZICO_API_KEY || 'sandbox-noviqVlRF6oY7obkTgHoXlbfKIhQWPqz';
  const secretKey = env.IYZICO_SECRET_KEY || 'sandbox-lFRZTg7O0MK8q7svquRoJfdXyKt9MPAI';
  
  const config: IyzicoConfig = {
    apiKey,
    secretKey,
    baseUrl: env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
  };

  // Log for debugging (remove sensitive data in production)
  console.log('Iyzico Client Initialized:', {
    apiKeyPrefix: apiKey.substring(0, 15) + '...',
    secretKeyPrefix: secretKey.substring(0, 15) + '...',
    baseUrl: config.baseUrl,
    usingEnvKeys: !!(env.IYZICO_API_KEY && env.IYZICO_SECRET_KEY)
  });

  return new IyzicoClient(config);
}

/**
 * Test cards for sandbox testing
 */
export const IYZICO_TEST_CARDS = {
  success: {
    number: '5528790000000008',
    expiry: '12/30',
    cvv: '123',
    holder: 'John Doe',
  },
  threeDSuccess: {
    number: '5528790000000008',
    expiry: '12/30',
    cvv: '123',
    holder: 'John Doe',
  },
  failure: {
    number: '5406670000000009',
    expiry: '12/30',
    cvv: '123',
    holder: 'John Doe',
  },
};

export default IyzicoClient;
