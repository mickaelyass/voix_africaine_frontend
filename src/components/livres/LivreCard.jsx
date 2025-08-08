import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const LivreCard = ({ livre, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const goToDetail = () => {
    navigate(`/dashboard/livre/${livre.id}`);
  };

  /* const handleDelete = async (e) => {
    e.stopPropagation(); // Empêche le clic sur la carte
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      try {
        await axios.delete(`http://localhost:8000/livres/${livre.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        onDelete && onDelete(livre.id);
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  }; */

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg relative cursor-pointer"
      onClick={goToDetail}
    >
      <h3 className="text-lg font-bold">{livre.titre}</h3>
      <p className="text-sm text-gray-600">Auteur : {livre.auteur}</p>
      {livre.description && (
        <p className="text-sm text-gray-700 mt-2">{livre.description}</p>
      )}

      {user?.role === 'admin' && (
        <button
          onClick={()=>onDelete(livre.id)}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
        >
          Supprimer
        </button>
      )}
    </div>
  );
};

export default LivreCard;
