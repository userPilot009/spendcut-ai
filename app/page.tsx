export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <p className="text-lg font-semibold">SpendCut AI</p>
        <a
          href="/login"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Sign in
        </a>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        <section className="max-w-3xl py-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            See exactly what SaaS you&apos;re wasting money on
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Upload your bank CSV and get a full waste report in 60 seconds.
            Built for UK startups.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Get free scan
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Get full report £49
            </a>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">Step 1</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                Upload your bank CSV
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">Step 2</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                We detect your subscriptions
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">Step 3</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                See what to cancel
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">Free</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Free scan
              </h3>
              <p className="mt-3 text-sm text-slate-600">See total spend only</p>
              <a
                href="/login"
                className="mt-6 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Start free
              </a>
            </div>

            <div className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-700">Paid</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Full report £49 one-time
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>Full breakdown</li>
                <li>Waste detection</li>
                <li>Cancel suggestions</li>
                <li>PDF report</li>
              </ul>
              <a
                href="/login"
                className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get full report
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <p className="mx-auto w-full max-w-6xl px-6 text-sm text-slate-600">
          SpendCut AI — Built for UK startups
        </p>
      </footer>
    </div>
  );
}
