function Hero() {
  return (
    <section className="bg-gray-100 py-12 text-center shadow-sm">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Organize Your Day, Your Way</h2>
        <p className="text-gray-700 mb-6">
          MyTask helps you track everything — from daily to-dos to long-term goals.
        </p>
        <a
          href="#tasks"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
