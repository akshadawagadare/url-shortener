import { LinkIcon } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LinkIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Snap<span className="text-primary">Link</span>
          </span>
        </div>
        <nav className="flex items-center gap-1">
          <a
            href="#dashboard"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Dashboard
          </a>
          <a
            href="#shorten"
            className="ml-1 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[oklch(0.70_0.25_295)]"
          >
            Shorten URL
          </a>
        </nav>
      </div>
    </header>
  )
}
