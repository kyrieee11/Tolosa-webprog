import { Link } from 'react-router-dom'
import Button from './Button'

function ArticleList({ articles }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-[28px] border-2 border-zinc-700 bg-white p-3 shadow-[0_10px_16px_rgba(0,0,0,0.12)]"
        >
          <div className="rounded-[22px] bg-zinc-100 p-3">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[18px] bg-zinc-200 overflow-hidden">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full rounded-[18px] object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-zinc-100 border border-zinc-300" />
              )}
            </div>
          </div>

          <div className="px-2 pb-2 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-lg font-semibold leading-tight text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500 line-clamp-3">
              {article.content?.[0]}
            </p>

            <Link to={`/articles/${article.name}`} className="inline-block">
              <Button
                variant="secondary"
                className="mt-4 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em]"
              >
                Read More
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ArticleList