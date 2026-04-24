import { Link, Navigate, useParams } from "react-router-dom";
import articles from "../../../assets/article-content";

function ArticlePage() {
  const { name } = useParams()

  const article = articles.find((a) => a.name === name)

  if (!article) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <section className="border-y-2 border-zinc-800 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/articles"
          className="inline-block rounded-full border border-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
        >
          Back to Articles
        </Link>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Article
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">{article.title}</p>
        </div>
      </section>

      <section className="border-2 border-zinc-700 bg-zinc-50 p-4 shadow-[0_10px_18px_rgba(0,0,0,0.12)] sm:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center rounded-[24px] bg-zinc-100 p-6">
            <div className="flex aspect-[4/3] w-full max-w-2xl items-center justify-center overflow-hidden rounded-[18px] border-2 border-zinc-500 bg-zinc-200">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded border border-zinc-300 bg-zinc-100" />
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-3xl space-y-4">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-7 text-zinc-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticlePage