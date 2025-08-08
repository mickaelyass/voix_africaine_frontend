import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user  } = useAuth()
    const API_URL = process.env.REACT_APP_API_URL;

      const [livres, setLivres] = useState([]);
     const navigate=useNavigate()
      useEffect(() => {
        const fetchLivres = async () => {
          const token = localStorage.getItem('access_token'); 
          try {
            const response = await axios.get(`${API_URL}/livres/public/`,{
             headers: {
            Authorization: `Bearer ${token}`
          }
          });
            setLivres(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Erreur lors du chargement des livres :', error);
          } 
        };
    
        fetchLivres();
      }, [API_URL]);
  return (
    <main className="flex-1">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {/* Section Bienvenue */}
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Bienvenue, {user?.full_name || 'Utilisateur'}!
                </h2>
                <p className="text-gray-600">
                  Vous êtes connecté en tant que <strong>{user?.email}</strong>
                </p>
                {user?.role === 'admin' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      Vous avez des privilèges d'administrateur
                    </p>
                  </div>
                )}
              </div>

              {/* Section Livres Publics */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Livres Publics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {/* Exemple de carte de livre */}
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      
          <div key={livres[0]?.id} className="bg-white shadow-md  rounded-2xl p-5 border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{livres[0]?.titre}</h3>
            <p className="text-sm text-gray-600 mb-1">✍️ <strong>Auteur :</strong> {livres[0]?.auteur}</p>
            {livres[0]?.description && (
              <p className="text-gray-700 text-sm mt-2">{livres[0]?.description}</p>
            )}
          </div>
      
                      <button onClick={()=>navigate("/dashboard/list-livre-public")} className="text-blue-500 p-5 hover:text-blue-700 text-sm font-medium">
                        Voir les plus
                      </button>
                    </div>
                  </div>
                  {/* Ajoutez plus de livres ici */}
                </div>
              </div>
            </div>
          </main>
  )
}

export default Home