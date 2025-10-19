export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-emerald-50 to-teal-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Fresh Food, <span className="text-emerald-600">Fast Delivery</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get delicious, healthy meals delivered to your door in 30 minutes or less. Farm-fresh ingredients,
              prepared with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Order Now
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-2xl overflow-hidden">
            <img src="/fresh-salad-bowl-with-vegetables.jpg" alt="Fresh food" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
