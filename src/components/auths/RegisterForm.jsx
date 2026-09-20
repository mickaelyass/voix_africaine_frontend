import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required('Le nom complet est requis').min(3, 'Trop court (minimum 3 caracteres)'),
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis').min(6, 'Trop court (minimum 6 caracteres)')
});

export default function RegisterForm({ onSuccess }) {
  const { register } = useAuth();
  const [submissionError, setSubmissionError] = useState('');
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '', full_name: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register(values);
        onSuccess && onSuccess();
      } catch (err) {
        setSubmissionError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
      } finally {
        setSubmitting(false);
      }
    }
  });

  const field = (name, label, type, placeholder) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input
        id={name} name={name} type={type}
        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name]}
        placeholder={placeholder} className="input" autoComplete={name === 'password' ? 'new-password' : name}
      />
      {formik.touched[name] && formik.errors[name] && <p className="field-error">{formik.errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {submissionError && <div className="alert-error" role="alert">{submissionError}</div>}
      {field('full_name', 'Nom et prenoms', 'text', 'Ex : Awa Diallo')}
      {field('email', 'Adresse email', 'email', 'vous@exemple.com')}
      <div>
        <label htmlFor="password" className="label">Mot de passe</label>
        <div className="relative">
          <input id="password" name="password" type={show ? 'text' : 'password'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="6 caracteres minimum" className="input pr-12" autoComplete="new-password" />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-xs font-bold text-brand-600">{show ? 'Masquer' : 'Afficher'}</button>
        </div>
        {formik.touched.password && formik.errors.password && <p className="field-error">{formik.errors.password}</p>}
      </div>
      <button type="submit" disabled={formik.isSubmitting} className="btn-primary w-full !py-3">
        {formik.isSubmitting ? 'Inscription en cours...' : "Creer mon compte"}
      </button>
      <p className="text-center text-xs text-ink-700/50">Deja un compte ? <Link to="/login" className="font-bold text-brand-600 hover:underline">Se connecter</Link></p>
    </form>
  );
}
