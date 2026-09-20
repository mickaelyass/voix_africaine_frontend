import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const LivreForm = ({ onSubmit, isSubmitting }) => {
  const formik = useFormik({
    initialValues: { id: uuidv4(), titre: '', auteur: '', description: '', is_public: true },
    validationSchema: Yup.object({
      id: Yup.string().required("L'identifiant est requis"),
      titre: Yup.string().min(1).max(100).required('Le titre est requis'),
      auteur: Yup.string().min(1).max(50).required("L'auteur est requis"),
      description: Yup.string().max(500, 'Max 500 caracteres'),
    }),
    onSubmit: (values) => { onSubmit(values); }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="titre" className="label">Titre du livre *</label>
          <input type="text" id="titre" name="titre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.titre} placeholder="Ex : L'enfant noir" className="input" />
          {formik.touched.titre && formik.errors.titre && <p className="field-error">{formik.errors.titre}</p>}
        </div>
        <div>
          <label htmlFor="auteur" className="label">Auteur *</label>
          <input type="text" id="auteur" name="auteur" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.auteur} placeholder="Ex : Camara Laye" className="input" />
          {formik.touched.auteur && formik.errors.auteur && <p className="field-error">{formik.errors.auteur}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="description" className="label">Resume</label>
        <textarea id="description" name="description" rows={4} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} placeholder="De quoi parle ce livre ? Donnez envie de l'ecouter..." className="input resize-none" />
        <p className="hint">{(formik.values.description || '').length}/500 caracteres</p>
        {formik.touched.description && formik.errors.description && <p className="field-error">{formik.errors.description}</p>}
      </div>
      <div className="flex items-center gap-4 rounded-2xl bg-sand-100 p-4">
        <button type="button" role="switch" aria-checked={formik.values.is_public} onClick={() => formik.setFieldValue('is_public', !formik.values.is_public)} className={'relative h-7 w-12 shrink-0 rounded-full transition ' + (formik.values.is_public ? 'bg-gradient-to-r from-brand-500 to-brand-700' : 'bg-ink-900/20')}>
          <span className={'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ' + (formik.values.is_public ? 'left-6' : 'left-1')} />
        </button>
        <div>
          <p className="text-sm font-black text-ink-900">Publier immediatement</p>
          <p className="text-xs text-ink-700/60">Visible par tous les lecteurs dans le catalogue public.</p>
        </div>
      </div>
      <details className="rounded-2xl border border-ink-900/10 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-xs font-bold text-ink-700/60">Identifiant technique (auto-genere)</summary>
        <div className="px-4 pb-4"><input type="text" id="id" name="id" value={formik.values.id} readOnly className="input input-readonly font-mono text-xs" /></div>
      </details>
      <div className="flex justify-end gap-3 border-t border-ink-900/10 pt-5">
        <button type="submit" disabled={isSubmitting} className="btn-primary !px-8">{isSubmitting ? 'Publication...' : 'Publier le livre'}</button>
      </div>
    </form>
  );
};

export default LivreForm;
