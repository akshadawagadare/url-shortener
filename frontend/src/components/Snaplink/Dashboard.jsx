import { Trash2, Copy, ExternalLink, BarChart2, AlertTriangle } from 'lucide-react'
import EmptyState from './EmptyState'

function formatExpiry(date) {
  if (!date) return 'Never'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max) + '...' : str
}

function isExpired(expiresAt) {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

export default function Dashboard({ links, onDelete, onCopy, onVisit }) {
  return (
    <section id="dashboard" className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Your Links</h2>
        </div>
        {links.length > 0 && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {links.length} {links.length === 1 ? 'link' : 'links'}
          </span>
        )}
      </div>

      {links.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card">
          <EmptyState />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Short URL
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Original URL
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Clicks
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Expires At
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, i) => {
                  const expired = isExpired(link.expiresAt)
                  return (
                    <tr
                      key={link.id}
                      className={`group transition-colors hover:bg-accent/40 ${
                        i !== links.length - 1 ? 'border-b border-border' : ''
                      } ${expired ? 'opacity-60' : ''}`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs text-primary">{link.shortUrl}</span>
                          {expired && (
                            <span className="flex items-center gap-0.5 rounded-full bg-destructive/15 px-1.5 py-0.5 text-xs font-semibold text-destructive-foreground">
                              <AlertTriangle className="h-3 w-3" />
                              Expired
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="max-w-[220px] px-5 py-3.5">
                        <span
                          title={link.originalUrl}
                          className="block truncate text-xs text-muted-foreground"
                        >
                          {truncate(link.originalUrl, 50)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {link.clicks}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">
                        {formatExpiry(link.expiresAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onVisit(link.shortUrl, link.expiresAt)}
                            aria-label="Open link"
                            disabled={expired}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => onCopy(link.shortUrl)}
                            aria-label="Copy link"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => onDelete(link.id)}
                            aria-label="Delete link"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {links.map((link) => {
              const expired = isExpired(link.expiresAt)
              return (
                <div
                  key={link.id}
                  className={`rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent/20 ${
                    expired ? 'opacity-60' : ''
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-semibold text-primary">{link.shortUrl}</span>
                      {expired && (
                        <span className="flex items-center gap-0.5 rounded-full bg-destructive/15 px-1.5 py-0.5 text-xs font-semibold text-destructive-foreground">
                          <AlertTriangle className="h-3 w-3" />
                          Expired
                        </span>
                      )}
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <p className="mb-3 truncate text-xs text-muted-foreground">{truncate(link.originalUrl, 60)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Expires: {formatExpiry(link.expiresAt)}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onVisit(link.shortUrl, link.expiresAt)}
                        aria-label="Open link"
                        disabled={expired}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onCopy(link.shortUrl)}
                        aria-label="Copy link"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(link.id)}
                        aria-label="Delete link"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/15 hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}