'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'portfolio-cookie-consent'
const GA_ID = 'G-5DRVRMBBRK'

type ConsentState = 'accepted' | 'rejected' | null

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [ready, setReady] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(CONSENT_KEY) as ConsentState
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsent(savedConsent)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true)

    window.addEventListener('open-cookie-preferences', openPreferences)
    return () => window.removeEventListener('open-cookie-preferences', openPreferences)
  }, [])

  const saveConsent = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
    setPreferencesOpen(false)
  }

  const showBanner = ready && (consent === null || preferencesOpen)

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-3xl rounded-3xl border border-border/70 bg-card/95 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:inset-x-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Cookies
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                This site uses Google Analytics to understand visits and improve the portfolio.
                You can accept or reject analytics cookies. Read the{' '}
                <Link href="/privacy" className="text-primary underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => saveConsent('rejected')}
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => saveConsent('accepted')}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
