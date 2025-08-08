import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
const LivreForm = ({ onSubmit,isSubmitting }) => {
  const formik = useFormik({
    initialValues: {
      id:  uuidv4(),
      titre: '',
      auteur: '',
      description: '',
      is_public: false,
    },
    validationSchema: Yup.object({
      id: Yup.string().required("L'identifiant est requis"),
      titre: Yup.string().min(1).max(100).required("Le titre est requis"),
      auteur: Yup.string().min(1).max(50).required("L'auteur est requis"),
      description: Yup.string().max(500, 'Max 500 caractères'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <div className="w-3/4 my-8 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Ajouter un Livre</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* ID */}
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
            Identifiant *
          </label>
                    <input
            type="text"
            id="id"
            name="id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            readOnly // ← l'utilisateur ne peut pas modifier l'ID
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />

          {formik.touched.id && formik.errors.id && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.id}</p>
          )}
        </div>

        {/* Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.titre}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
          {formik.touched.titre && formik.errors.titre && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.titre}</p>
          )}
        </div>

        {/* Auteur */}
        <div>
          <label htmlFor="auteur" className="block text-sm font-medium text-gray-700 mb-1">
            Auteur *
          </label>
          <input
            type="text"
            id="auteur"
            name="auteur"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.auteur}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
          {formik.touched.auteur && formik.errors.auteur && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.auteur}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_public"
            name="is_public"
            onChange={formik.handleChange}
            checked={formik.values.is_public}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_public" className="text-sm text-gray-700">
            Livre public
          </label>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded ${isSubmitting ? 'opacity-50' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Créer le livre'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LivreForm;
