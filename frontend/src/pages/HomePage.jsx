import { useState, useCallback } from 'react'
import Navbar from '../components/snaplink/Navbar'
import ShortenForm from '../components/snaplink/ShortenForm'
import ResultCard from '../components/snaplink/ResultCard'
import Dashboard from '../components/snaplink/Dashboard'
import Toast from '../components/snaplink/Toast'

const BASE = 'http://localhost:5000'

export default function HomePage() {
  const [links, setLinks] = useState([])
  const [latestShort, setLatestShort] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const fetchAnalytics = useCallback(async (shortCode) => {
    try {
      const response = await fetch(`${BASE}/analytics/${shortCode}`)
      const data = await response.json()
      if (response.ok) {
        setLinks((prev) =>
          prev.map((l) =>
            l.shortCode === shortCode ? { ...l, clicks: data.clicks } : l
          )
        )
      }
    } catch (err) {
      console.error('Analytics fetch failed', err)
    }
  }, [])

  const handleShorten = async (longUrl, expiryDays) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: longUrl, expiresInDays: expiryDays }),
      })

      const data = await response.json()

      if (!response.ok) {
        addToast(data.message || 'Something went wrong', 'error')
        return
      }

      const shortCode = data.shortUrl.split('/').pop()

      // Check if this link already exists in the dashboard
      const alreadyExists = links.find((l) => l.shortCode === shortCode)
      if (alreadyExists) {
        setLatestShort(data.shortUrl)
        addToast('This URL was already shortened!', 'success')
        fetchAnalytics(shortCode)
        return
      }

      const entry = {
        id: crypto.randomUUID(),
        shortCode,
        shortUrl: data.shortUrl,
        originalUrl: longUrl,
        clicks: 0,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        createdAt: new Date(),
      }

      setLinks((prev) => [entry, ...prev])
      setLatestShort(data.shortUrl)
      addToast('Short link created!')
      fetchAnalytics(shortCode)

    } catch (err) {
      addToast('Cannot connect to server. Is your backend running?', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVisit = useCallback((shortUrl, expiresAt) => {
    // Check expiry before opening
    if (expiresAt && new Date(expiresAt) < new Date()) {
      addToast('This link has expired!', 'error')
      return
    }
    const shortCode = shortUrl.split('/').pop()
    window.open(shortUrl, '_blank')
    // Refresh click count after visit
    setTimeout(() => fetchAnalytics(shortCode), 1000)
  }, [addToast, fetchAnalytics])

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast('Copied to clipboard!')
    })
  }, [addToast])

  const handleDelete = useCallback((id) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
    addToast('Link deleted.')
  }, [addToast])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <ShortenForm onShorten={handleShorten} isLoading={isLoading} />
        {latestShort && (
          <div className="mt-6">
            <ResultCard shortUrl={latestShort} onCopy={handleCopy} />
          </div>
        )}
        <div className="mt-14">
          <Dashboard
            links={links}
            onDelete={handleDelete}
            onCopy={handleCopy}
            onVisit={handleVisit}
          />
        </div>
      </main>
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}