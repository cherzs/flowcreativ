import { Button } from "@/components/ui/button"
export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-br from-black via-purple-950/10 to-black py-24 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              TAKE CONTROL OF
              <br />
              YOUR DIGITAL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                TRANSFORMATION
              </span>
            </h2>
            <p className="text-sm text-white/40 uppercase tracking-wider">EXCELLENCE AT EVERY STEP</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-white text-xl font-semibold mb-2">• 10+ Years of Experience</h3>
              <p className="text-white/60 leading-relaxed">
                Proven track record delivering successful projects across industries, from startups to enterprises.
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-2">• Agile Development Process</h3>
              <p className="text-white/60 leading-relaxed">
                Iterative approach ensuring flexibility, transparency, and continuous delivery of value.
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-2">• Modern Technology Stack</h3>
              <p className="text-white/60 leading-relaxed">
                Leveraging cutting-edge technologies like React, Next.js, Node.js, AWS, and more for optimal results.
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-2">• 24/7 Support & Maintenance</h3>
              <p className="text-white/60 leading-relaxed">
                Ongoing technical support and proactive maintenance to keep your systems running smoothly.
              </p>
            </div>

            <Button className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white mt-4">
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
