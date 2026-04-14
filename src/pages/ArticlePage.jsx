function ArticlePage() {
  const articles = [
    {
      title: 'Why reusable components matter',
      text: 'Reusable components reduce code duplication and make your interface easier to maintain.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    },
    {
      title: 'Designing better landing pages',
      text: 'A good landing page has strong hierarchy, clean spacing, and simple calls to action.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    },
    {
      title: 'Using React Router effectively',
      text: 'Routing allows users to navigate between pages smoothly while preserving component structure.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Articles
        </p>
        <h2 className="text-4xl font-bold">Insights and design notes</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article key={article.title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
              <p className="text-zinc-600">{article.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ArticlePage