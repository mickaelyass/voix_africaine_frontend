import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LivreCard from '../components/livres/LivreCard';
import { useNavigate } from 'react-router-dom';

const ListeLivre = () => {
  const [livres, setLivres] = useState([]);
  const token = localStorage.getItem('access_token');
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate=useNavigate()
  const handleDeleteLivre = async(id) => {
 
 
  if (!window.confirm("Confirmer la suppression de ce chapitre ?")) return;
      try {
        console.log("mon token ",token);
        await axios.delete(`${API_URL}/livres/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       fetchLivres();
        navigate(`/dashboard/list-livre-public`);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error.response?.data || error);
        console.log("mon token ",token);
      }
  
};

const fetchLivres = async () => {
      try {
        const res = await axios.get(`${API_URL}/livres/public/`);
        setLivres(res.data);
      } catch (err) {
        console.error('Erreur de chargement :', err);
      }
    };

  useEffect(() => {
    

    fetchLivres();
  }, []);

  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Livres Disponibles</h1>

  {livres.length === 0 ? (
    <p className="text-gray-500 italic">Aucun livre disponible pour le moment.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {livres.map((livre) => (
        <LivreCard key={livre.id} livre={livre} onDelete={handleDeleteLivre} />
      ))}
    </div>
  )}
</div>

  );
};

export default ListeLivre;
