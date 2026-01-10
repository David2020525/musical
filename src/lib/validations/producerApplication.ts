import { z } from 'zod'

// Turkish ID validation (11 digits)
const turkishIdSchema = z
  .string()
  .regex(/^\d{11}$/, 'Turkish ID must be exactly 11 digits')
  .refine((id) => {
    // Turkish ID algorithm validation
    const digits = id.split('').map(Number)
    const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7
    const sum2 = digits[1] + digits[3] + digits[5] + digits[7]
    const digit10 = (sum1 - sum2) % 10
    const sum3 = digits.slice(0, 10).reduce((a, b) => a + b, 0)
    const digit11 = sum3 % 10
    
    return digits[9] === digit10 && digits[10] === digit11
  }, 'Invalid Turkish ID number')

// Phone validation (Turkish format)
const phoneSchema = z
  .string()
  .regex(/^(\+90|0)?5\d{9}$/, 'Invalid Turkish phone number format (e.g., 05551234567 or +905551234567)')

// URL validation with optional empty
const optionalUrlSchema = z
  .string()
  .optional()
  .transform((val) => val || undefined)
  .refine((url) => !url || /^https?:\/\/.+/.test(url), 'Must be a valid URL starting with http:// or https://')

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  real_name: z
    .string()
    .min(3, 'Real name must be at least 3 characters')
    .max(100, 'Real name must be less than 100 characters')
    .regex(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/, 'Real name must contain only letters and spaces'),
  
  turkish_id: turkishIdSchema,
  
  phone: phoneSchema,
})

// Step 2: Social Links
export const socialLinksSchema = z.object({
  instagram_url: optionalUrlSchema,
  twitter_url: optionalUrlSchema,
  youtube_url: optionalUrlSchema,
  spotify_url: optionalUrlSchema,
  soundcloud_url: optionalUrlSchema,
})

// Step 3: Portfolio Links
export const portfolioLinksSchema = z.object({
  portfolio_url: optionalUrlSchema,
  sample_track_1: optionalUrlSchema,
  sample_track_2: optionalUrlSchema,
  sample_track_3: optionalUrlSchema,
})

// Complete application schema (all steps combined)
export const producerApplicationSchema = z.object({
  ...personalInfoSchema.shape,
  ...socialLinksSchema.shape,
  ...portfolioLinksSchema.shape,
})

// Type inference
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>
export type PortfolioLinksFormData = z.infer<typeof portfolioLinksSchema>
export type ProducerApplicationFormData = z.infer<typeof producerApplicationSchema>
