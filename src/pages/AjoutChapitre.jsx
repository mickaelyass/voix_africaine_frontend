import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const AjoutChapitre = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { livreId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { id: uuidv4(), titre: '', numero: '', contenu_texte: '' },
    validationSchema: Yup.object({
      id: Yup.string().required('Requis'),
      titre: Yup.string().required('Requis'),
      numero: Yup.number().required('Requis').positive().integer(),
      contenu_texte: Yup.string().required('Requis'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataToSend = { ...values, livre_id: livreId, audio_url: '', is_public: 'True', duration_sec: 1, created_by: user?.id || '' };
        await axios.post(API_URL + '/chapitres/', dataToSend, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
        resetForm();
        navigate('/dashboard/livre/' + livreId);
      } catch (error) {
        alert(error.response?.data?.detail || "Erreur lors de l'ajout du chapitre");
      }
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to={'/dashboard/livre/' + livreId} className="text-sm font-bold text-brand-600 hover:underline">Retour a la fiche du livre</Link>
      <div className="page-header">
        <div>
          <p className="eyebrow">Nouveau chapitre</p>
          <h1 className="page-title">Ecrire un chapitre</h1>
          <p className="page-subtitle">Le texte servira de support de lecture avant l enregistrement audio.</p>
        </div>
      </div>
      <div className="card"><div className="card-body">
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Numero du chapitre</label>
              <input name="numero" type="number" min="1" placeholder="Ex : 1" className="input" value={formik.values.numero} onChange={formik.handleChange} />
              {formik.errors.numero && <p className="field-error">{formik.errors.numero}</p>}
            </div>
            <div>
              <label className="label">Titre du chapitre</label>
              <input name="titre" type="text" placeholder="Ex : Le depart" className="input" value={formik.values.titre} onChange={formik.handleChange} />
              {formik.errors.titre && <p className="field-error">{formik.errors.titre}</p>}
            </div>
          </div>
          <div>
            <label className="label">Texte a lire a voix haute</label>
            <textarea name="contenu_texte" rows={9} placeholder="Collez ici le texte que le conteur lira au micro..." className="input resize-y leading-relaxed" value={formik.values.contenu_texte} onChange={formik.handleChange} />
            {formik.errors.contenu_texte && <p className="field-error">{formik.errors.contenu_texte}</p>}
          </div>
          <div className="flex items-center justify-between border-t border-ink-900/10 pt-5">
            <p className="hint">Enregistrement audio possible juste apres la creation.</p>
            <button type="submit" className="btn-primary !px-8">Ajouter le chapitre</button>
          </div>
        </form>
      </div></div>
    </div>
  );
};

export default AjoutChapitre;
