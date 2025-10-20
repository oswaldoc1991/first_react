import Greeting from './Greeting';

function Hero({ name = "Everyone"}) {
  return (
    <section className="bg-blue-100 py-12 text-center shadow">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font bold mb-4">Organize Your Day, Your Way!!!</h2>
        <p className="text-gray-700 mb-6">
          MyTask helps you track everything ranging from simple errands to your most important projects.
        </p>
        <Greeting name={name} />
      </div>
    </section>
  )
}
export default Hero;