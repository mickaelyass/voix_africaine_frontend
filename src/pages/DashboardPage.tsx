import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Layout avec sidebar et content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation - Tailwind uniquement */}
        <div className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Menu</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="block px-4 py-2 text-gray-700 bg-blue-50 rounded font-medium">
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href="/dashboard/list-livre-public" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Livres publics
                </a>
              </li>
             {/*  <li>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Mes livres
                </a>
              </li> */}
             {/*  {user?.role === 'admin' && (
                
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Administration
                  </a>
                </li>
                
              )} */}
              {user?.role === 'admin' && (
                
                <li>
                  <a href="/dashboard/ajouter-livre" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    AJouter un livre
                  </a>
                </li>
                
              )}
            </ul>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </header>

          {/* Mobile menu button (visible seulement sur mobile) */}
          <div className="md:hidden bg-white p-4 shadow flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Menu</h1>
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <Outlet></Outlet>
        </div>
      </div>

      {/* Footer - Tailwind uniquement */}
      <footer className="bg-white shadow-inner py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2023 Votre Application. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Mentions légales</button>
              <button className="text-gray-600 hover:text-gray-900">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}