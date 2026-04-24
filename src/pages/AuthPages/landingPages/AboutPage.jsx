function AboutPage() {
  const values = [
    'Clean and readable UI design',
    'Reusable React components',
    'Responsive layout structure',
    'Clear and organized content sections',
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            About Us
          </p>
          <h2 className="mb-4 text-4xl font-bold">Style Meets Comfort</h2>
          <p className="text-zinc-600">
            AT Clothes is a modern fashion brand focused on delivering stylish,
  comfortable, and affordable clothing for everyday wear. We believe that
  fashion should express confidence and individuality.
          </p>
        </div>

        <img
          src="https://wallpapercave.com/wp/wp10921927.jpg"
          alt="Team collaboration"
          className="h-72 w-full rounded-3xl object-cover"
        />
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
        <p className="text-zinc-600">
           Our mission is to provide high-quality clothing that combines style,
  comfort, and affordability. We aim to make fashion accessible for
  everyone while maintaining modern trends and timeless designs.
        </p>
      </section>

      <section>
        <h3 className="mb-4 text-2xl font-bold">Core Values</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <div key={value} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-zinc-700">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage