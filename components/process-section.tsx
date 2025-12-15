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
    <section className="bg-gradient-to-br from-black via-purple-950/10 to-black py-24 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            HOW WE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">WORK</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our proven process ensures successful delivery every time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="text-6xl font-black text-white/10 mb-4">{step.number}</div>
              <h3 className="text-white text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
