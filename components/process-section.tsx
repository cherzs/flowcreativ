export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Understanding your business goals, challenges, and technical requirements",
    },
    {
      number: "02",
      title: "Design",
      description: "Creating user-centered designs and technical architecture",
    },
    {
      number: "03",
      title: "Develop",
      description: "Building your solution with agile methodology and best practices",
    },
    {
      number: "04",
      title: "Deploy",
      description: "Launching your product with thorough testing and quality assurance",
    },
    {
      number: "05",
      title: "Support",
      description: "Ongoing maintenance, updates, and technical support",
    },
  ]

  return (
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
            How we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">work</span>.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-xl">
            Our proven process ensures successful delivery every time.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
          {steps.map((step) => (
            <div
              key={step.number}
              className="py-8 flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="text-sm font-medium text-neutral-400 w-12">{step.number}</div>
              <div className="flex-1">
                <h3 className="text-neutral-900 text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <span className="text-sm">Learn more</span>
                <span className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
