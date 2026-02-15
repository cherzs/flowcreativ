import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)
    const blog = dictionary.blogPage

    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6">{blog.title}</h1>
                <p className="text-xl text-neutral-600 mb-12">
                    {blog.description}
                </p>

                <div className="max-w-md mx-auto p-12 rounded-2xl bg-white border border-neutral-200">
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-4">{blog.comingSoonTitle}</h2>
                    <p className="text-neutral-600">
                        {blog.comingSoonDescription}
                    </p>
                </div>
            </div>
        </main>
    )
}
