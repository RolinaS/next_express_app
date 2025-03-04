import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Mon Application
          </Link>
          
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              À propos
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
