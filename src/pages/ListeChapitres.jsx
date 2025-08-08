import React, { useState } from 'react';
import AudioRecorderUploader from './AudioRecorderUploader';

const ListeChapitres = ({ chapitres, user, onTogglePublic, onDelete }) => {
  const [chapitreActif, setChapitreActif] = useState(null);
 const token = localStorage.getItem('access_token');
  const handleSelectChapitre = (chapitre) => {
    setChapitreActif(chapitre);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Liste des chapitres */}
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
      <div className="col-span-2">
        {chapitreActif ? (
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Chapitre {chapitreActif.numero} – {chapitreActif.titre}
            </h3>
            <p className="text-gray-700 mb-4">{chapitreActif.contenu_texte}</p>
            {chapitreActif.audio_url && (
              <audio controls src={chapitreActif.audio_url} className="w-full rounded" />
            )}
             {!chapitreActif.audio_url && (
              <AudioRecorderUploader chapitreId={chapitreActif.id} token={token} />
            )}
            
          </div>
        ) : (
          <div className="text-gray-500 italic mt-10">Sélectionnez un chapitre pour afficher son contenu</div>
        )}
      </div>
    </div>
  );
};

export default ListeChapitres;
