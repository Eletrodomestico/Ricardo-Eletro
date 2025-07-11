export function CategoryBanner() {
  const categories = [
    {
      title: "📱 CELULARES",
      description: "iPhone, Samsung, Xiaomi e mais!",
      emoji: "📱",
    },
    {
      title: "🧊 GELADEIRAS",
      description: "As melhores marcas com os melhores preços!",
      emoji: "🧊",
    },
    {
      title: "🔥 FOGÕES",
      description: "Para sua cozinha ficar completa!",
      emoji: "🔥",
    },
    {
      title: "👕 LAVADORAS",
      description: "Facilite sua vida com nossas ofertas!",
      emoji: "👕",
    },
    {
      title: "📺 TVs & SOM",
      description: "Entretenimento para toda família!",
      emoji: "📺",
    },
    {
      title: "❄️ AR CONDICIONADO",
      description: "Climatização perfeita para sua casa!",
      emoji: "❄️",
    },
    {
      title: "🍳 COZINHA",
      description: "Tudo para sua cozinha dos sonhos!",
      emoji: "🍳",
    },
    {
      title: "💻 INFORMÁTICA",
      description: "Notebooks, tablets e acessórios!",
      emoji: "💻",
    },
  ]

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">NAVEGUE POR CATEGORIAS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-3xl mb-2">{category.emoji}</div>
              <h3 className="font-bold text-xs mb-1">{category.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{category.description}</p>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 w-full">
                Ver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
