import { useState } from 'react'
import { LinkIcon, Scissors, Clock } from 'lucide-react'

export default function ShortenForm({ onShorten, isLoading }) {
  const [url, setUrl] = useState('')
  const [expiryDays, setExpiryDays] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL to shorten.')
      return
    }

    try {
      new URL(url.trim())
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com).')
      return
    }

    const days = expiryDays ? parseInt(expiryDays, 10) : null
    if (expiryDays && (isNaN(days) || days < 1)) {
      setError('Expiry must be a positive number of days.')
      return
    }

    onShorten(url.trim(), days)
    setUrl('')
    setExpiryDays('')
  }

  return (
    <section id="shorten" className="w-full">
      {/* Hero headline */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          Shorten your links,{' '}
          <span className="text-primary">amplify your reach</span>
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          Paste a long URL below and get a clean, shareable short link in seconds.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <form onSubmit={handleSubmit} noValidate>
          {/* URL input */}
          <div className="mb-4">
            <label htmlFor="url-input" className="mb-1.5 block text-sm font-medium text-foreground">
              Long URL
            </label>
            <div className="relative">
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/here"
                className="w-full rounded-lg border border-border bg-input py-3 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Expiry input */}
          <div className="mb-5">
            <label htmlFor="expiry-input" className="mb-1.5 block text-sm font-medium text-foreground">
              Expiry <span className="ml-1 text-xs text-muted-foreground">(optional, in days)</span>
            </label>
            <div className="relative">
              <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="expiry-input"
                type="number"
                min="1"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                placeholder="e.g. 30"
                className="w-full rounded-lg border border-border bg-input py-3 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-[oklch(0.70_0.25_295)] hover:shadow-[0_0_20px_oklch(0.63_0.25_295_/_0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Scissors className="h-4 w-4" />
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
      </div>
    </section>
  )
}
