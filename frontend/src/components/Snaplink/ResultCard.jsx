import { CheckCircle, Copy, ExternalLink } from 'lucide-react'

export default function ResultCard({ shortUrl, onCopy }) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl border border-primary/40 bg-card p-6 shadow-[0_0_30px_oklch(0.63_0.25_295_/_0.15)]">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-primary" />
        <p className="text-sm font-semibold text-primary">Link shortened successfully!</p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3">
        <span className="flex-1 truncate font-mono text-sm text-foreground">{shortUrl}</span>
        <div className="flex items-center gap-2">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open short URL in new tab"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={() => onCopy(shortUrl)}
            aria-label="Copy short URL to clipboard"
            className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground transition-all hover:bg-[oklch(0.70_0.25_295)] active:scale-95"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
