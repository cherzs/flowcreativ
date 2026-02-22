import { Code, Smartphone, Palette, Shield, Server, Settings } from "lucide-react"

export default function ServicesOverview({ dictionary }: { dictionary: any }) {
  const icons = [Settings, Code, Settings, Smartphone, Palette, Shield, Server, Code]

  return (
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="mb-14 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
            {dictionary.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              {dictionary.titleHighlight}
            </span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-3xl">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-neutral-200">
          {dictionary.items.map((service: any, index: number) => {
            const Icon = icons[index] || Settings
            const total = dictionary.items.length
            const itemsPerRow = 2
            const lastRowStart = total - itemsPerRow
            const isLastRow = index >= lastRowStart
            const isLastItem = index === total - 1
            return (
              <div
                key={service.title}
                className={`p-8 md:p-10 border-neutral-200 ${
                  isLastItem ? "border-b-0" : "border-b"
                } ${isLastRow ? "md:border-b-0" : "md:border-b"} ${index % itemsPerRow === 1 ? "md:border-l" : ""}`}
              >
                <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-neutral-900" />
                </div>
                <h3 className="text-neutral-900 text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
