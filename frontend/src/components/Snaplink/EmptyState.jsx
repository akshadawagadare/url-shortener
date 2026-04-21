export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Illustration */}
      <div className="relative mb-6">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card">
          {/* Chain / link icon illustration */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            aria-hidden="true"
          >
            {/* Left chain link */}
            <rect
              x="2"
              y="16"
              width="16"
              height="12"
              rx="6"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-muted-foreground"
            />
            {/* Right chain link */}
            <rect
              x="26"
              y="16"
              width="16"
              height="12"
              rx="6"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-primary"
            />
            {/* Middle connector */}
            <line
              x1="18"
              y1="22"
              x2="26"
              y2="22"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="3 2"
              className="text-muted-foreground"
            />
            {/* Scissors diagonal left */}
            <line
              x1="17"
              y1="5"
              x2="27"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary"
            />
            {/* Scissors diagonal right */}
            <line
              x1="27"
              y1="5"
              x2="17"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-foreground">No shortened links yet</h3>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
        Paste a long URL into the form above and hit{' '}
        <span className="font-medium text-primary">Shorten URL</span> to create your first link.
      </p>
    </div>
  )
}
