import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AjoutChapitre = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { livreId } = useParams();
  const {user}=useAuth()
 const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      id: '',
      titre: '',
      numero: '',
      contenu_texte: '',
      is_public: false,
    },
    validationSchema: Yup.object({
      id: Yup.string().required('Requis'),
      titre: Yup.string().required('Requis'),
      numero: Yup.number().required('Requis').positive().integer(),
      contenu_texte: Yup.string().required('Requis'),

    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataToSend = {
          ...values,
          livre_id: livreId,
          is_public:"true",
          audio_url: "",
          is_public: "True",
          duration_sec: 1,
          created_by: user?.id || "",

        };
        const response = await axios.post(`${API_URL}/chapitres`, dataToSend, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        alert('Chapitre ajouté avec succès');

        resetForm();
        navigate(`/dashboard/livre/${livreId}`)
      } catch (error) {
        alert(error.response?.data?.detail || 'Erreur lors de l\'ajout du chapitre');
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Chapitre</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">ID du chapitre</label>
          <input
            name="id"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          {formik.errors.id && <p className="text-red-500 text-sm">{formik.errors.id}</p>}
        </div>

        <div>
          <label className="block font-medium">Titre</label>
          <input
            name="titre"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.titre}
            onChange={formik.handleChange}
          />
          {formik.errors.titre && <p className="text-red-500 text-sm">{formik.errors.titre}</p>}
        </div>

        <div>
          <label className="block font-medium">Numéro</label>
          <input
            name="numero"
            type="number"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.numero}
            onChange={formik.handleChange}
          />
          {formik.errors.numero && <p className="text-red-500 text-sm">{formik.errors.numero}</p>}
        </div>

        <div>
          <label className="block font-medium">Contenu texte</label>
          <textarea
            name="contenu_texte"
            className="w-full border border-gray-300 p-2 rounded"
            rows={5}
            value={formik.values.contenu_texte}
            onChange={formik.handleChange}
          />
          {formik.errors.contenu_texte && <p className="text-red-500 text-sm">{formik.errors.contenu_texte}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          Ajouter Chapitre
        </button>
      </form>
    </div>
  );
};

export default AjoutChapitre;
