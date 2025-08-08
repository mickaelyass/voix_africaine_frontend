import React, { useState, useRef } from 'react';

export default function AudioRecorderUploader({ chapitreId, token }) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
   const API_URL = process.env.REACT_APP_API_URL;
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/ogg' });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', audioBlob, 'enregistrement.ogg'); // Utilisation cohérente avec le type MIME

    try {
      
      const response = await fetch(`${API_URL}/chapitres/${chapitreId}/upload-audio`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem('access_token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’upload');
      }

      const data = await response.json();
      alert('Upload réussi 🎉');
      console.log('Chapitre mis à jour :', data);
    } catch (err) {
      console.error(err);
      alert('Échec de l’upload ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Enregistrer une lecture</h2>

      <div className="flex flex-col gap-4 items-center">
        {!recording ? (
          <button
            onClick={startRecording}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            🎙️ Commencer l'enregistrement
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            ⏹️ Stopper
          </button>
        )}

        {audioUrl && (
          <div className="w-full mt-4">
            <p className="font-medium">Prévisualisation :</p>
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}

        {audioBlob && (
          <button
            onClick={uploadAudio}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Upload en cours...' : '📤 Envoyer vers le serveur'}
          </button>
        )}
      </div>
    </div>
  );
}
