/**
 * File Upload Utilities for Cloudflare R2
 * 
 * Handles file uploads for audio tracks and cover images
 * to Cloudflare R2 storage.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
}

export interface FileValidation {
  isValid: boolean
  error?: string
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',      // .mp3
  'audio/wav',       // .wav
  'audio/ogg',       // .ogg
  'audio/flac',      // .flac
  'audio/aac',       // .aac
  'audio/x-m4a',     // .m4a
]

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_AUDIO_SIZE = 100 * 1024 * 1024  // 100 MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024    // 5 MB

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate audio file
 */
export function validateAudioFile(file: File): FileValidation {
  // Check file size
  if (file.size > MAX_AUDIO_SIZE) {
    return {
      isValid: false,
      error: `Audio file too large. Maximum size is ${MAX_AUDIO_SIZE / 1024 / 1024}MB`,
    }
  }

  // Check file type
  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid audio format. Allowed: MP3, WAV, OGG, FLAC, AAC, M4A`,
    }
  }

  return { isValid: true }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): FileValidation {
  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      error: `Image too large. Maximum size is ${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
    }
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid image format. Allowed: JPEG, PNG, WebP',
    }
  }

  return { isValid: true }
}

// ============================================================================
// FILE KEY GENERATION
// ============================================================================

/**
 * Generate unique file key for R2
 */
export function generateFileKey(userId: number, filename: string, type: 'audio' | 'cover'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  const extension = filename.split('.').pop()
  
  return `${type}/${userId}/${timestamp}-${random}.${extension}`
}

/**
 * Generate public URL for R2 object
 */
export function generatePublicUrl(key: string, bucketUrl?: string): string {
  // Use custom domain or R2 public URL
  const baseUrl = bucketUrl || process.env.R2_PUBLIC_URL || 'https://musichub-tracks.r2.dev'
  return `${baseUrl}/${key}`
}

// ============================================================================
// R2 UPLOAD
// ============================================================================

/**
 * Upload file to Cloudflare R2
 */
export async function uploadToR2(
  bucket: R2Bucket,
  file: File | ArrayBuffer,
  key: string,
  contentType: string
): Promise<UploadResult> {
  try {
    // Convert File to ArrayBuffer if needed
    const buffer = file instanceof File ? await file.arrayBuffer() : file

    // Upload to R2
    await bucket.put(key, buffer, {
      httpMetadata: {
        contentType,
      },
    })

    // Generate public URL
    const url = generatePublicUrl(key)

    return {
      success: true,
      url,
      key,
    }
  } catch (error: any) {
    console.error('R2 upload error:', error)
    return {
      success: false,
      error: error.message || 'Failed to upload file',
    }
  }
}

/**
 * Delete file from Cloudflare R2
 */
export async function deleteFromR2(
  bucket: R2Bucket,
  key: string
): Promise<boolean> {
  try {
    await bucket.delete(key)
    return true
  } catch (error: any) {
    console.error('R2 delete error:', error)
    return false
  }
}

/**
 * Get file from Cloudflare R2
 */
export async function getFromR2(
  bucket: R2Bucket,
  key: string
): Promise<R2ObjectBody | null> {
  try {
    return await bucket.get(key)
  } catch (error: any) {
    console.error('R2 get error:', error)
    return null
  }
}

// ============================================================================
// MULTIPART FORM DATA PARSING
// ============================================================================

/**
 * Parse multipart form data from request
 * Note: This is a simplified version. In production, use a proper multipart parser.
 */
export async function parseMultipartFormData(request: Request): Promise<{
  fields: Record<string, string>
  files: Record<string, File>
}> {
  const contentType = request.headers.get('content-type') || ''
  
  if (!contentType.includes('multipart/form-data')) {
    throw new Error('Request must be multipart/form-data')
  }

  try {
    const formData = await request.formData()
    const fields: Record<string, string> = {}
    const files: Record<string, File> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value
      } else {
        fields[key] = value.toString()
      }
    }

    return { fields, files }
  } catch (error: any) {
    throw new Error(`Failed to parse form data: ${error.message}`)
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

/**
 * Get content type from file extension
 */
export function getContentType(filename: string): string {
  const ext = getFileExtension(filename)
  
  const contentTypes: Record<string, string> = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'flac': 'audio/flac',
    'aac': 'audio/aac',
    'm4a': 'audio/x-m4a',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
  }

  return contentTypes[ext] || 'application/octet-stream'
}

/**
 * Extract audio duration from file (placeholder)
 * In production, use a library like music-metadata
 */
export async function getAudioDuration(file: File): Promise<number | null> {
  // TODO: Implement actual audio duration extraction
  // For now, return null
  return null
}

/**
 * Generate audio waveform data (placeholder)
 */
export async function generateWaveform(file: File): Promise<number[] | null> {
  // TODO: Implement waveform generation
  // For now, return null
  return null
}
