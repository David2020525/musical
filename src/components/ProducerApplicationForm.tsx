import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  personalInfoSchema,
  socialLinksSchema,
  portfolioLinksSchema,
  type PersonalInfoFormData,
  type SocialLinksFormData,
  type PortfolioLinksFormData,
  type ProducerApplicationFormData,
} from '../lib/validations/producerApplication'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { useLocaleStore } from '../store'
import { t } from '../lib/i18n'

type Step = 1 | 2 | 3

interface StepProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
}

const StepIndicator: React.FC<StepProps & { title: string }> = ({
  step,
  isActive,
  isCompleted,
  title,
}) => {
  return (
    <div className="flex items-center">
      <div
        className={`
          flex items-center justify-center w-10 h-10 rounded-full font-bold
          ${
            isCompleted
              ? 'bg-green-500 text-white'
              : isActive
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600'
          }
        `}
      >
        {isCompleted ? '✓' : step}
      </div>
      <div className="ml-3">
        <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          Step {step}
        </div>
        <div className={`text-xs ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>{title}</div>
      </div>
    </div>
  )
}

interface ProducerApplicationFormProps {
  onSuccess: () => void
  onCancel?: () => void
}

export const ProducerApplicationForm: React.FC<ProducerApplicationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { locale } = useLocaleStore()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<Partial<ProducerApplicationFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Step 1: Personal Information
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData,
  })

  // Step 2: Social Links
  const {
    register: registerSocial,
    handleSubmit: handleSubmitSocial,
    formState: { errors: errorsSocial },
  } = useForm<SocialLinksFormData>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: formData,
  })

  // Step 3: Portfolio Links
  const {
    register: registerPortfolio,
    handleSubmit: handleSubmitPortfolio,
    formState: { errors: errorsPortfolio },
  } = useForm<PortfolioLinksFormData>({
    resolver: zodResolver(portfolioLinksSchema),
    defaultValues: formData,
  })

  const onStepComplete = (stepData: Partial<ProducerApplicationFormData>) => {
    setFormData({ ...formData, ...stepData })
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleFinalSubmit = async (stepData: PortfolioLinksFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    const completeData = { ...formData, ...stepData }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('/api/producer/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(completeData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit application')
      }

      onSuccess()
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator
            step={1}
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
            title={t('producer.personalInfo', locale)}
          />
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div
              className={`h-full transition-all ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          </div>
          <StepIndicator
            step={2}
            isActive={currentStep === 2}
            isCompleted={currentStep > 2}
            title={t('producer.socialLinks', locale)}
          />
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div
              className={`h-full transition-all ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          </div>
          <StepIndicator
            step={3}
            isActive={currentStep === 3}
            isCompleted={false}
            title={t('producer.portfolio', locale)}
          />
        </div>
      </div>

      {/* Error Display */}
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {submitError}
        </div>
      )}

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('producer.personalInfo', locale)}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPersonal(onStepComplete)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.realName', locale)} *
                </label>
                <Input {...registerPersonal('real_name')} placeholder="Ahmet Yılmaz" />
                {errorsPersonal.real_name && (
                  <p className="text-red-500 text-sm mt-1">{errorsPersonal.real_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.turkishId', locale)} *
                </label>
                <Input
                  {...registerPersonal('turkish_id')}
                  placeholder="12345678901"
                  maxLength={11}
                />
                {errorsPersonal.turkish_id && (
                  <p className="text-red-500 text-sm mt-1">{errorsPersonal.turkish_id.message}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  {t('producer.turkishIdHelp', locale)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.phone', locale)} *
                </label>
                <Input
                  {...registerPersonal('phone')}
                  placeholder="05551234567"
                  type="tel"
                />
                {errorsPersonal.phone && (
                  <p className="text-red-500 text-sm mt-1">{errorsPersonal.phone.message}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  {t('producer.phoneHelp', locale)}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    {t('common.cancel', locale)}
                  </Button>
                )}
                <Button type="submit">{t('common.next', locale)} →</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Social Links */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('producer.socialLinks', locale)}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitSocial(onStepComplete)} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                {t('producer.socialLinksHelp', locale)}
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <Input
                  {...registerSocial('instagram_url')}
                  placeholder="https://instagram.com/yourprofile"
                />
                {errorsSocial.instagram_url && (
                  <p className="text-red-500 text-sm mt-1">{errorsSocial.instagram_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter/X
                </label>
                <Input
                  {...registerSocial('twitter_url')}
                  placeholder="https://twitter.com/yourprofile"
                />
                {errorsSocial.twitter_url && (
                  <p className="text-red-500 text-sm mt-1">{errorsSocial.twitter_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube
                </label>
                <Input
                  {...registerSocial('youtube_url')}
                  placeholder="https://youtube.com/@yourprofile"
                />
                {errorsSocial.youtube_url && (
                  <p className="text-red-500 text-sm mt-1">{errorsSocial.youtube_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spotify
                </label>
                <Input
                  {...registerSocial('spotify_url')}
                  placeholder="https://open.spotify.com/artist/..."
                />
                {errorsSocial.spotify_url && (
                  <p className="text-red-500 text-sm mt-1">{errorsSocial.spotify_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SoundCloud
                </label>
                <Input
                  {...registerSocial('soundcloud_url')}
                  placeholder="https://soundcloud.com/yourprofile"
                />
                {errorsSocial.soundcloud_url && (
                  <p className="text-red-500 text-sm mt-1">{errorsSocial.soundcloud_url.message}</p>
                )}
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={goBack}>
                  ← {t('common.back', locale)}
                </Button>
                <Button type="submit">{t('common.next', locale)} →</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Portfolio Links */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('producer.portfolio', locale)}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPortfolio(handleFinalSubmit)} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                {t('producer.portfolioHelp', locale)}
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.portfolioUrl', locale)}
                </label>
                <Input
                  {...registerPortfolio('portfolio_url')}
                  placeholder="https://yourwebsite.com"
                />
                {errorsPortfolio.portfolio_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsPortfolio.portfolio_url.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.sampleTrack', locale)} 1
                </label>
                <Input
                  {...registerPortfolio('sample_track_1')}
                  placeholder="https://soundcloud.com/your-track-1"
                />
                {errorsPortfolio.sample_track_1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsPortfolio.sample_track_1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.sampleTrack', locale)} 2
                </label>
                <Input
                  {...registerPortfolio('sample_track_2')}
                  placeholder="https://soundcloud.com/your-track-2"
                />
                {errorsPortfolio.sample_track_2 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsPortfolio.sample_track_2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('producer.sampleTrack', locale)} 3
                </label>
                <Input
                  {...registerPortfolio('sample_track_3')}
                  placeholder="https://soundcloud.com/your-track-3"
                />
                {errorsPortfolio.sample_track_3 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsPortfolio.sample_track_3.message}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-blue-900 mb-2">
                  {t('producer.reviewNote', locale)}
                </h4>
                <p className="text-sm text-blue-700">
                  {t('producer.reviewNoteText', locale)}
                </p>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={goBack}>
                  ← {t('common.back', locale)}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t('common.submitting', locale) : t('common.submit', locale)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
