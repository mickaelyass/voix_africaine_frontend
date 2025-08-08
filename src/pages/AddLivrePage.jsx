import React, { useState } from 'react';
import LivreForm from '../components/livres/LivreForm';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Pour les notifications



const AddLivrePage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLivreSubmit = async (livreData) => {
    setIsSubmitting(true);
    setError(null);

    try {
         const token = localStorage.getItem('access_token'); 
      // Ajouter l'ID de l'utilisateur courant aux données du livre
      const dataToSend = {
        ...livreData,
        created_by: user?.id // Ajoutez l'ID de l'utilisateur
      };
            const api = axios.create({
        baseURL: API_URL,
        });
      const response = await api.post('/livres', dataToSend, {
         headers: {
        Authorization: `Bearer ${token}`
      }
      });

      // Afficher un message de succès
      
      alert('Livre créé avec succès!');
      navigate(`/dashboard/list-livre-public`);
      // Rediriger vers la page du livre ou le dashboard
      /* navigate(`/livres/${response.data.id}`); */
      
    } catch (error) {
      console.error('Erreur lors de la création du livre:', error);
      setError(
        error.response?.data?.detail || 
        'Une erreur est survenue lors de la création du livre'
      );
      toast.error('Erreur lors de la création du livre');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 ms-28">Ajouter un nouveau livre</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <LivreForm 
        onSubmit={handleLivreSubmit} 
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddLivrePage;
