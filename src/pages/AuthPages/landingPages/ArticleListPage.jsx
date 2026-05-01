import Button from "../../../components/Button";
import ArticleList from "../../../components/ArticleList";
import articles from "../../../data/article-content";

function ArticleListPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="border-y-2 border-zinc-800 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
          ARTICLES
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Discover the latest in fashion and style
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600 sm:text-base">
          Explore curated articles on trends, styling tips, and modern fashion inspiration for everyday wear.
        </p>

        <div className="mt-6">
          <Button to="/" variant="secondary" className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em]">
            Back Home
          </Button>
        </div>
      </section>

      <section className="border-4 border-[#d1c99b] bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Article card grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  )
}

export default ArticleListPage