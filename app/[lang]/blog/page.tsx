export default function BlogPage() {
    return (
        <main className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
                <p className="text-xl text-white/60 mb-12">
                    Insights, updates, and news from the FlowCreativ team.
                </p>

                <div className="max-w-md mx-auto p-12 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-white/60">
                        We are currently crafting high-quality articles for you. Stay tuned!
                    </p>
                </div>
            </div>
        </main>
    )
}
