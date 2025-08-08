import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Bienvenue sur Voix Africaine
      </h1>
      
      <div className="space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Inscription
            </Link>
          </>
        ) : (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Accéder au tableau de bord
          </Link>
        )}
      </div>
    </div>
  )
}