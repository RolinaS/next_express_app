import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Bienvenue sur Mon Application
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fonctionnalité 1</h2>
          <p className="text-gray-600">
            Description de la première fonctionnalité de l'application.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fonctionnalité 2</h2>
          <p className="text-gray-600">
            Description de la deuxième fonctionnalité de l'application.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fonctionnalité 3</h2>
          <p className="text-gray-600">
            Description de la troisième fonctionnalité de l'application.
          </p>
        </div>
      </div>
    </div>
  );
}
