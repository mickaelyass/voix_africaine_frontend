import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ListeChapitres from './ListeChapitres';

const LivreDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [livre, setLivre] = useState(null);
  const [chapitres, setChapitres] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('access_token');
  const fetchLivre = async () => {
      try {
        const res = await axios.get(`${API_URL}/livres/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLivre(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du livre :', error);
      }
    };

    const fetchChapitres = async () => {
      try {
        const res = await axios.get(`${API_URL}/chapitres/livre/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChapitres(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des chapitres :', error);
      }
    };

     const deleteChapitre = async (chapitreId) => {
    if (!window.confirm("Confirmer la suppression de ce chapitre ?")) return;
    try {
      await axios.delete(`${API_URL}/chapitres/${chapitreId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchChapitres();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response?.data || error);
    }
  };


  useEffect(() => {
    fetchLivre();
    fetchChapitres();
  }, [id,fetchChapitres, fetchLivre]);


  const toggleChapitrePublic = async (chapitreId) => {
  try {
    await axios.patch(`${API_URL}/chapitres/${chapitreId}/toggle-public`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // si tu utilises JWT
      },
    });
    // Recharger les chapitres après mise à jour
    fetchChapitres();
  } catch (error) {
    console.error("Erreur lors du changement de visibilité :", error.response?.data || error);
  }
};


  if (!livre) return <p className="text-center text-gray-500 mt-8">Chargement du livre...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{livre.titre}</h2>
        <p className="text-lg text-gray-600 mb-4 italic">Auteur : {livre.auteur}</p>
        <p className="text-gray-700">{livre.description || "Pas de description disponible."}</p>

        {user?.role === 'admin' && livre?.id && (
          <div className="mt-4">
            <a
              href={`/dashboard/livres/${livre.id}/ajouter-chapitre`}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-200 inline-block"
            >
              + Ajouter un chapitre
            </a>
          </div>
        )}
      </div>

     <ListeChapitres chapitres={chapitres} user={user} onDelete={deleteChapitre}  onTogglePublic={toggleChapitrePublic} />

    </div>
  );
};

export default LivreDetail;
