export default function TrustedBy() {
  const clients = ["Microsoft", "Amazon", "Google", "Tesla", "Apple", "Meta"]

  return (
    <section className="bg-black border-y border-white/10 py-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-white/60 text-sm mb-6">TRUSTED BY INDUSTRY LEADERS</p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {clients.map((client) => (
            <div key={client} className="text-white/40 text-xl font-semibold hover:text-white/80 transition-colors">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
