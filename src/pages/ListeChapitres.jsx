import React, { useState, useEffect, useCallback } from 'react';
import AudioRecorderUploader from './AudioRecorderUploader';
import axios from 'axios';

const ListeChapitres = ({ chapitres, user, onTogglePublic, onDelete }) => {
  const [chapitreActif, setChapitreActif] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const token = localStorage.getItem('access_token');
  const API_URL = process.env.REACT_APP_API_URL;

  // --- Stabiliser la fonction avec useCallback ---
  const chargerCommentaires = useCallback(async () => {
    if (!chapitreActif) return;
    try {
      const response = await axios.get(
        `${API_URL}/commentaires/?chapitre_id=${chapitreActif.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("commentaires", response.data);
      setCommentaires(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires", error);
    }
  }, [chapitreActif, API_URL, token]);

  // --- Charger commentaires quand le chapitre change ---
  useEffect(() => {
    if (chapitreActif) {
      chargerCommentaires();
    }
  }, [chapitreActif, chargerCommentaires]);

  const handleSelectChapitre = (chapitre) => {
    setChapitreActif(chapitre);
    setCommentaires([]); // Reset des commentaires avant le rechargement
  };

  const handleAjouterCommentaire = async (e) => {
    e.preventDefault();
    if (!nouveauCommentaire.trim()) return;

    try {
      await axios.post(
        `${API_URL}/commentaires`,
        {
          contenu: nouveauCommentaire,
          timestamp: timestamp,
          chapitre_id: chapitreActif?.id,
          user_id: user?.id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNouveauCommentaire('');
      chargerCommentaires(); // Recharge après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire", error);
    }
  };

  const handleTimeUpdate = (e) => {
    setTimestamp(e.target.currentTime);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Liste des chapitres (inchangé) */}
      <div className="col-span-1">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Chapitres disponibles</h2>
          {chapitres.length === 0 ? (
            <p className="text-gray-500 italic">Aucun chapitre disponible.</p>
          ) : (
            <ul className="space-y-3">
              {chapitres.map((chapitre) => (
                <li
                  key={chapitre.id}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    chapitreActif?.id === chapitre.id
                      ? 'bg-blue-50 border-blue-400'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => handleSelectChapitre(chapitre)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">
                      Chapitre {chapitre.numero} – {chapitre.titre}
                    </span>
                    {(user?.role === 'admin' || user?.id === chapitre.created_by) && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePublic(chapitre.id);
                          }}
                          className={`text-xs px-3 py-1 rounded-full font-semibold transition ${
                            chapitre.is_public
                              ? 'bg-yellow-500 hover:bg-yellow-600'
                              : 'bg-gray-500 hover:bg-gray-600'
                          } text-white`}
                        >
                          {chapitre.is_public ? 'Privé' : 'Public'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(chapitre.id);
                          }}
                          className="text-xs px-3 py-1 rounded-full font-semibold bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          x
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Contenu du chapitre sélectionné */}
      <div className="col-span-2 space-y-4">
        {chapitreActif ? (
          <>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Chapitre {chapitreActif.numero} – {chapitreActif.titre}
              </h3>
              <p className="text-gray-700 mb-4">{chapitreActif.contenu_texte}</p>
              
              {chapitreActif.audio_url && (
                <audio 
                  controls 
                  src={chapitreActif.audio_url} 
                  className="w-full rounded mb-4"
                  onTimeUpdate={handleTimeUpdate}
                />
              )}
              
              {!chapitreActif.audio_url && (
                <AudioRecorderUploader chapitreId={chapitreActif.id} token={token} />
              )}
            </div>

            {/* Section Commentaires */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Commentaires</h3>
              
              {/* Formulaire d'ajout */}
              <form onSubmit={handleAjouterCommentaire} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nouveauCommentaire}
                    onChange={(e) => setNouveauCommentaire(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-300"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Envoyer
                  </button>
                </div>
                {chapitreActif.audio_url && (
                  <div className="text-sm text-gray-500 mt-1">
                    Position audio: {timestamp.toFixed(1)}s
                  </div>
                )}
              </form>

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {commentaires.length === 0 ? (
                  <p className="text-gray-500 italic">Aucun commentaire pour ce chapitre.</p>
                ) : (
                  commentaires.map((commentaire) => (
                    <div key={commentaire.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800">
                          {commentaire.user_info.full_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(commentaire.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{commentaire.contenu}</p>
                      {commentaire.timestamp > 0 && (
                        <button 
                          onClick={() => {
                            const audio = document.querySelector('audio');
                            if (audio) {
                              audio.currentTime = commentaire.timestamp;
                              audio.play();
                            }
                          }}
                          className="text-sm text-blue-500 hover:text-blue-700 mt-1"
                        >
                          ▶ À {commentaire.timestamp.toFixed(1)}s
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500 italic mt-10">
            Sélectionnez un chapitre pour afficher son contenu
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeChapitres;