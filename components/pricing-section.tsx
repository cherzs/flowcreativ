import Link from "next/link"

export default function PricingSection({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <section className="bg-gray-50 py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">{dictionary.label}</p>
            {dictionary.smeBadge ? (
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-600 mb-4">
                {dictionary.smeBadge}
              </span>
            ) : null}
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
              {dictionary.title}
            </h2>
          </div>
          <div>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed">{dictionary.subtitle}</p>
            {dictionary.trustLine ? (
              <p className="text-neutral-600 text-sm mt-4 leading-relaxed">{dictionary.trustLine}</p>
            ) : null}
            <p className="mt-4 text-xs text-neutral-500">{dictionary.note}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dictionary.items.map((item: any) => (
            <div
              key={item.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_12px_30px_rgba(17,17,17,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                {item.tag ? (
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">{item.tag}</p>
                ) : (
                  <span />
                )}
                {item.badge ? (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-purple-600 border border-purple-200 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <div className="mt-4">
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">{dictionary.priceNote}</p>
                <p className="text-3xl font-semibold text-neutral-900 mt-2">{item.price}</p>
              </div>
              <p className="text-neutral-600 text-sm mt-4 leading-relaxed">{item.description}</p>
              {item.details?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {item.details.map((detail: string) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-neutral-500">{dictionary.footer}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition"
          >
            {dictionary.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
