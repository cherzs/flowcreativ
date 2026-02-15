export default function BlogPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6">Our Blog</h1>
                <p className="text-xl text-neutral-600 mb-12">
                    Insights, updates, and news from the FlowCreativ team.
                </p>

                <div className="max-w-md mx-auto p-12 rounded-2xl bg-white border border-neutral-200">
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Coming Soon</h2>
                    <p className="text-neutral-600">
                        We are currently crafting high-quality articles for you. Stay tuned!
                    </p>
                </div>
            </div>
        </main>
    )
}
