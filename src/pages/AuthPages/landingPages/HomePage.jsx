import Button from "../../../components/Button";


function HomePage() {
  const stats = [
    { label: 'Projects', value: '12+' },
    { label: 'Clients', value: '24+' },
    { label: 'Designs', value: '48+' },
    { label: 'Awards', value: '06' },
  ]

  const cards = [
  {
    title: 'Oversized T-Shirt',
    text: 'Comfortable and stylish everyday wear.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
  },
  {
    title: 'Denim Jacket',
    text: 'Classic look with modern fit.',
    image: 'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/474564/sub/goods_474564_sub13_3x4.jpg?width=600',
  },
  {
    title: 'Casual Hoodie',
    text: 'Perfect for streetwear style.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.CiCW0E2i0KSovTAs90B26QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  },

  ]

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            NEW ARRIVAL
          </p>
          <h2 className="mb-4 text-4xl font-bold text-zinc-900">
            Elevate Your Style
          </h2>
          <p className="mb-6 text-zinc-600">
            Discover modern clothing designed for comfort, confidence, and everyday wear.
          </p>
          <div className="flex gap-3">
            <Button>Get Started</Button>
            <Button to="/about" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-photo/blurred-background-clothing-store_1258-82.jpg"
            alt="Workspace"
            className="h-72 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-zinc-500">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Simple wireframe cards</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-3xl bg-white p-6 shadow-sm">

  <img
    src={card.image}
    alt={card.title}
    className="mb-4 h-40 w-full rounded-2xl object-cover"
  />

  <h4 className="mb-2 text-xl font-semibold">{card.title}</h4>
  <p className="mb-4 text-zinc-600">{card.text}</p>
  <Button variant="secondary">View More</Button>

</article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage