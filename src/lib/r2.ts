/**
 * Cloudflare R2 Storage Integration
 * Handles file uploads, downloads, and signed URL generation
 */

import crypto from 'crypto';

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
}

export interface UploadOptions {
  key: string;
  body: ArrayBuffer | ReadableStream | Blob;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface SignedUrlOptions {
  key: string;
  expiresIn?: number; // seconds, default 3600 (1 hour)
}

/**
 * R2 Client for file operations
 */
class R2Client {
  private config: R2Config;
  private endpoint: string;

  constructor(config: R2Config) {
    this.config = config;
    this.endpoint = `https://${config.accountId}.r2.cloudflarestorage.com`;
  }

  /**
   * Generate AWS Signature V4
   */
  private generateSignature(options: {
    method: string;
    path: string;
    query?: string;
    headers: Record<string, string>;
    payload: string;
    timestamp: string;
  }): string {
    const { method, path, query, headers, payload, timestamp } = options;

    // Date for credential scope
    const date = timestamp.split('T')[0];
    const region = 'auto';
    const service = 's3';

    // Canonical request
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map(key => `${key.toLowerCase()}:${headers[key].trim()}`)
      .join('\n');

    const signedHeaders = Object.keys(headers)
      .sort()
      .map(key => key.toLowerCase())
      .join(';');

    const payloadHash = crypto
      .createHash('sha256')
      .update(payload)
      .digest('hex');

    const canonicalRequest = [
      method,
      path,
      query || '',
      canonicalHeaders + '\n',
      signedHeaders,
      payloadHash,
    ].join('\n');

    // String to sign
    const canonicalRequestHash = crypto
      .createHash('sha256')
      .update(canonicalRequest)
      .digest('hex');

    const credentialScope = `${date}/${region}/${service}/aws4_request`;

    const stringToSign = [
      'AWS4-HMAC-SHA256',
      timestamp,
      credentialScope,
      canonicalRequestHash,
    ].join('\n');

    // Calculate signature
    const getSignatureKey = (key: string, dateStamp: string, regionName: string, serviceName: string) => {
      const kDate = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest();
      const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
      const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
      const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
      return kSigning;
    };

    const signingKey = getSignatureKey(this.config.secretAccessKey, date, region, service);
    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(stringToSign)
      .digest('hex');

    return signature;
  }

  /**
   * Upload file to R2
   */
  async upload(options: UploadOptions): Promise<{ success: boolean; url: string; error?: string }> {
    try {
      const { key, body, contentType = 'application/octet-stream', metadata = {} } = options;

      const path = `/${this.config.bucketName}/${key}`;
      const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      const host = `${this.config.accountId}.r2.cloudflarestorage.com`;

      // Convert body to buffer for signature
      let bodyBuffer: ArrayBuffer;
      if (body instanceof ArrayBuffer) {
        bodyBuffer = body;
      } else if (body instanceof Blob) {
        bodyBuffer = await body.arrayBuffer();
      } else {
        // ReadableStream - we'll need to collect it
        const reader = body.getReader();
        const chunks: Uint8Array[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        bodyBuffer = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          bodyBuffer.set(chunk, offset);
          offset += chunk.length;
        }
      }

      const headers: Record<string, string> = {
        'Host': host,
        'Content-Type': contentType,
        'x-amz-date': timestamp,
      };

      // Add metadata headers
      Object.keys(metadata).forEach(key => {
        headers[`x-amz-meta-${key}`] = metadata[key];
      });

      const signature = this.generateSignature({
        method: 'PUT',
        path,
        headers,
        payload: Buffer.from(bodyBuffer).toString(),
        timestamp,
      });

      const date = timestamp.split('T')[0];
      const credentialScope = `${date}/auto/s3/aws4_request`;
      const signedHeaders = Object.keys(headers)
        .sort()
        .map(k => k.toLowerCase())
        .join(';');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${this.config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const url = `${this.endpoint}${path}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: bodyBuffer,
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('R2 upload error:', error);
        return { success: false, url: '', error: `Upload failed: ${response.statusText}` };
      }

      const publicUrl = `${this.config.publicUrl}/${key}`;
      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('R2 upload error:', error);
      return { success: false, url: '', error: String(error) };
    }
  }

  /**
   * Delete file from R2
   */
  async delete(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      const path = `/${this.config.bucketName}/${key}`;
      const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      const host = `${this.config.accountId}.r2.cloudflarestorage.com`;

      const headers: Record<string, string> = {
        'Host': host,
        'x-amz-date': timestamp,
      };

      const signature = this.generateSignature({
        method: 'DELETE',
        path,
        headers,
        payload: '',
        timestamp,
      });

      const date = timestamp.split('T')[0];
      const credentialScope = `${date}/auto/s3/aws4_request`;
      const signedHeaders = Object.keys(headers)
        .sort()
        .map(k => k.toLowerCase())
        .join(';');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${this.config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const url = `${this.endpoint}${path}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('R2 delete error:', error);
        return { success: false, error: `Delete failed: ${response.statusText}` };
      }

      return { success: true };
    } catch (error) {
      console.error('R2 delete error:', error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Generate signed URL for temporary access
   */
  generateSignedUrl(options: SignedUrlOptions): string {
    const { key, expiresIn = 3600 } = options;

    const path = `/${this.config.bucketName}/${key}`;
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = timestamp.split('T')[0];
    const host = `${this.config.accountId}.r2.cloudflarestorage.com`;

    const credentialScope = `${date}/auto/s3/aws4_request`;
    const credential = `${this.config.accessKeyId}/${credentialScope}`;

    const query = new URLSearchParams({
      'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
      'X-Amz-Credential': credential,
      'X-Amz-Date': timestamp,
      'X-Amz-Expires': expiresIn.toString(),
      'X-Amz-SignedHeaders': 'host',
    }).toString();

    const headers: Record<string, string> = {
      'Host': host,
    };

    const signature = this.generateSignature({
      method: 'GET',
      path,
      query,
      headers,
      payload: '',
      timestamp,
    });

    return `${this.endpoint}${path}?${query}&X-Amz-Signature=${signature}`;
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(key: string): string {
    return `${this.config.publicUrl}/${key}`;
  }
}

/**
 * Initialize R2 client
 */
export function createR2Client(env: any): R2Client {
  const config: R2Config = {
    accountId: env.R2_ACCOUNT_ID || '8acb02437032e44576dc364343c04059',
    accessKeyId: env.R2_ACCESS_KEY_ID || 'bc87e631b295b635948d9abf31756e2d',
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || '30152cc476f6efa086ff01f3bdd18d14adf96acdffc22951295aa06bfec4c0a8',
    bucketName: env.R2_BUCKET_NAME || 'musichub-tracks',
    publicUrl: env.R2_PUBLIC_URL || 'https://8acb02437032e44576dc364343c04059.r2.cloudflarestorage.com',
  };

  return new R2Client(config);
}

/**
 * File upload utilities
 */

export interface AudioMetadata {
  duration?: number;
  bitrate?: number;
  sampleRate?: number;
  format?: string;
}

/**
 * Validate audio file
 */
export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 'audio/x-wav'];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only MP3 and WAV files are allowed' };
  }

  return { valid: true };
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size exceeds 5MB limit' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid image type. Only JPG and PNG files are allowed' };
  }

  return { valid: true };
}

/**
 * Generate unique file key
 */
export function generateFileKey(filename: string, userId: number, type: 'audio' | 'cover' | 'preview'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return `${type}/${userId}/${timestamp}-${random}.${ext}`;
}

export default R2Client;
