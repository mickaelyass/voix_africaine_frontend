import React, { useState, useRef, useEffect } from 'react';

// Formats audio proposes au MediaRecorder, par ordre de preference.
// Chrome => audio/webm, Firefox => audio/ogg, Safari => audio/mp4.
const MIME_CANDIDATS = [
  'audio/webm;codecs=opus',
  'audio/ogg;codecs=opus',
  'audio/webm',
  'audio/ogg',
  'audio/mp4',
  'audio/mpeg',
];

const choisirMimeType = () => {
  if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return '';
  for (const m of MIME_CANDIDATS) {
    if (MediaRecorder.isTypeSupported(m)) return m;
  }
  return '';
};

const baseMime = (mime) => (mime || '').split(';')[0].trim();

const extensionDepuisMime = (mime) => {
  switch (baseMime(mime)) {
    case 'audio/webm': return 'webm';
    case 'audio/ogg': return 'ogg';
    case 'audio/mp4': return 'm4a';
    case 'audio/mpeg': return 'mp3';
    case 'audio/wav':
    case 'audio/x-wav': return 'wav';
    default: return 'webm';
  }
};

export default function AudioRecorderUploader({ chapitreId, token, existingAudio = false, audioValidated = false, onUploadSuccess }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const mimeTypeRef = useRef('');

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, [audioUrl]);

  const startRecording = async () => {
    if (audioValidated) { alert('Cet audio a ete valide et ne peut plus etre modifie.'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = choisirMimeType();
      mimeTypeRef.current = mimeType;
      const mr = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioChunksRef.current = [];
      mr.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      mr.onstop = () => {
        // On utilise le type reel supporte par le navigateur (pas un type force)
        const blob = new Blob(audioChunksRef.current, { type: baseMime(mimeTypeRef.current) || undefined });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch (e) {
      console.error(e);
      alert("Impossible d'acceder au microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) { alert('Aucun audio a envoyer.'); return; }
    if (!chapitreId) { alert('Chapitre inconnu : rechargez la page.'); return; }
    setLoading(true);
    try {
      // Endpoint backend : PUT /chapitres/{id}/upload-audio (cf. app/routes/chapitres.py)
      // Le nom du champ DOIT etre "file" : c'est le nom du parametre
      // FastAPI declare (file: UploadFile = File(...)). Avec un autre nom,
      // l'API repond 422 "Field required" et l'audio n'est jamais envoye a
      // Cloudinary.
      const extension = extensionDepuisMime(mimeTypeRef.current || audioBlob.type);
      const formData = new FormData();
      formData.append('file', audioBlob, 'chapitre-' + chapitreId + '.' + extension);
      const resp = await fetch(API_URL + '/chapitres/' + chapitreId + '/upload-audio', {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
        body: formData,
      });
      if (!resp.ok) {
        let detail = "Echec de l'upload";
        if (resp.status === 401) detail = 'Session expiree : reconnectez-vous.';
        else if (resp.status === 403) detail = "Action non autorisee sur ce chapitre.";
        try {
          const err = await resp.json();
          if (err && err.detail) detail = typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail);
        } catch (_) { /* reponse non JSON */ }
        throw new Error(detail);
      }
      const data = await resp.json();
      setAudioBlob(null);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      if (onUploadSuccess) onUploadSuccess(data);
    } catch (error) {
      console.error(error);
      alert(error.message || "Echec de l'upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-brand-500/25 bg-brand-50/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-ink-900">{existingAudio ? "Remplacer l'audio" : 'Ajouter un audio'}</p>
          <p className="text-xs text-ink-700/60">Enregistrez au micro, ecoutez, puis envoyez.</p>
        </div>
        {recording && (
          <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> REC
          </span>
        )}
      </div>
      {audioValidated && <div className="alert-success mt-3">Audio valide — lecture seule.</div>}
      {!audioValidated && (
        <div className="mt-4 flex flex-col items-center gap-3">
          {!recording ? (
            <button onClick={startRecording} disabled={loading} className="btn-primary w-full">Demarrer l enregistrement</button>
          ) : (
            <button onClick={stopRecording} className="btn w-full bg-red-600 text-white hover:bg-red-700">Stopper</button>
          )}
          {audioUrl && (
            <div className="w-full rounded-xl bg-white p-3 ring-1 ring-inset ring-ink-900/10">
              <p className="mb-2 text-xs font-bold text-ink-700/60">Previsualisation</p>
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}
          {audioBlob && (
            <button onClick={uploadAudio} disabled={loading} className="btn-success w-full">{loading ? 'Upload en cours...' : (existingAudio ? "Remplacer l'audio" : "Envoyer l'audio")}</button>
          )}
        </div>
      )}
    </div>
  );
}
