function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 3.5v9m0 0 3.25-3.5M8 12.5 4.75 9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FlowDiagram({ steps = [], caption }) {
  return (
    <figure className="not-prose my-10">
      <div className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-8 dark:border-zinc-700/40 dark:bg-zinc-800/30">
        {steps.map((step, index) => (
          <div key={step} className="flex w-full flex-col items-center">
            <div className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:text-zinc-100">
              {step}
            </div>
            {index < steps.length - 1 && (
              <ArrowDownIcon className="my-2 h-4 w-4 stroke-zinc-400 dark:stroke-zinc-500" />
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
