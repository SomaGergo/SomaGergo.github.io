import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/#contact"
          className="inline-flex items-center rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          Back to site
        </Link>

        <div className="mt-8 rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-2xl shadow-primary/5 backdrop-blur-sm md:p-12">
          <div className="space-y-4 border-b border-border/60 pb-8">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary">
              Privacy Policy
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Privacy and cookies
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              This portfolio uses limited analytics to understand how visitors use the site and
              which project pages attract the most interest.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: July 26, 2026
            </p>
          </div>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">What is collected</h2>
              <p>
                If you accept analytics cookies, this site uses Google Analytics 4 to collect
                standard website usage information such as page views, approximate location,
                device type, browser information, and general interaction data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Why it is collected</h2>
              <p>
                The analytics data helps measure portfolio traffic, understand which work samples
                are most useful to visitors, and improve the website experience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
              <p>
                Google Analytics may place analytics cookies in your browser after you give
                consent. These cookies help distinguish visits and measure site performance.
              </p>
              <p>
                You can reject analytics cookies from the banner, and you can reopen cookie
                settings from the website footer area at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Third-party service</h2>
              <p>
                Analytics data is processed by Google Analytics. Google may process data according
                to its own terms and privacy documentation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
              <p>
                For questions about this website or privacy, contact{' '}
                <a
                  href="mailto:agergosoma@gmail.com"
                  className="text-primary underline underline-offset-4"
                >
                  agergosoma@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
