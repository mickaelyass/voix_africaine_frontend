import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { CFormInput, CForm, CAlert} from '@coreui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';


// Schéma de validation Yup
const validationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Le nom complet est requis')
    .min(3, 'Trop court (minimum 3 caractères)'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .required('Mot de passe requis')
    .min(6, 'Trop court (minimum 6 caractères)')
});

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register } = useAuth();
  const [submissionError, setSubmissionError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      full_name: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register(values);
        onSuccess?.();
      } catch (err) {
        setSubmissionError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

      {submissionError && (
        <CAlert color="danger" className="mb-4">
          {submissionError}
        </CAlert>
      )}

      <CForm onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700 mb-1">
            Nom et prenoms
          </label>
          <CFormInput
            id="full_name"
            name="full_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.full_name}
            invalid={formik.touched.full_name && !!formik.errors.full_name}
          />
          {formik.touched.full_name && formik.errors.full_name && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.full_name}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <CFormInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            invalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Mot de passe
          </label>
          <CFormInput
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            invalid={formik.touched.password && !!formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          color="primary"
          className="w-full"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </CForm>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-500 hover:underline">
          Déjà un compte ? Se connecter
        </Link>
      </div>
    </div>
  );
}