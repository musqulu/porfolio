export function MetricCard({ metric, label, note }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 dark:border-zinc-700/40 dark:bg-zinc-800/30">
      <p className="text-xl font-semibold leading-tight tracking-tight text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-100 sm:text-2xl">
        {metric}
      </p>
      <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
        {label}
      </p>
      {note && (
        <p className="mt-auto pt-3 text-xs leading-snug text-zinc-400 dark:text-zinc-500">
          {note}
        </p>
      )}
    </div>
  )
}

export function PrincipleCard({ title, description }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 dark:border-zinc-700/40 dark:bg-zinc-800/30">
      <p className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </p>
      <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  )
}

export function PrincipleGrid({ principles = [] }) {
  return (
    <div className="not-prose mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
      {principles.map((item) => (
        <PrincipleCard
          key={item.title}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  )
}

export function ImpactSnapshot({ intro, metrics = [] }) {
  return (
    <section className="not-prose my-12">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Impact snapshot
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      )}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {metrics.map((item) => (
          <MetricCard
            key={item.label}
            metric={item.metric}
            label={item.label}
            note={item.note}
          />
        ))}
      </div>
    </section>
  )
}
