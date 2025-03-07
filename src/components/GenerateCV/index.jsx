import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

const validate = Yup.object({
  fullName: Yup.string().required("Tam ad daxil edilməlidir"),
  img_url: Yup.string().required("Şəkil URL-i daxil edilməlidir"),
  email: Yup.string().email("Email səhvdir").required("Email daxil edilməlidir"),
  about: Yup.string().required("Haqqınızda məlumat daxil edilməlidir"),
  education: Yup.array().of(Yup.string().required("Təhsil məlumatı daxil edilməlidir")),
  workExperience: Yup.array().of(Yup.string().required("İş təcrübəsi daxil edilməlidir")),
  skills: Yup.array().of(Yup.string().required("Bacarıq daxil edilməlidir")),
});

function GenerateCV({ setForm, form, isEditing }) {

  const { handleChange, values, errors, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      fullName: form?.fullName || "",
      img_url: form?.img_url || "",
      email: form?.email || "",
      about: form?.about || "",
      education: form?.education || [""], 
      workExperience: form?.workExperience || [""],
      skills: form?.skills || [""], 
    },
    onSubmit: (form) => {
      setForm(form);  
      resetForm();    
    },
    validationSchema: validate,
  });


  const handleAdd = (field) => {
    if (field === "education") {
      values.education.push("");
    } else if (field === "workExperience") {
      values.workExperience.push("");
    } else if (field === "skills") {
      values.skills.push("");
    }
    handleChange({ target: { name: field, value: values[field] } });
  };

  useEffect(() => {
    if (isEditing) {
      resetForm({
        values: {
          fullName: form?.fullName || "",
          img_url: form?.img_url || "",
          email: form?.email || "",
          about: form?.about || "",
          education: form?.education || [""],
          workExperience: form?.workExperience || [""],
          skills: form?.skills || [""],
        },
      });
    }
  }, [form, isEditing, resetForm]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Tam Ad</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className="w-full p-3 mt-2 border rounded-lg shadow-sm"
          />
          {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Şəkil URL</label>
          <input
            type="text"
            name="img_url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.img_url}
            className="w-full p-3 mt-2 border rounded-lg shadow-sm"
          />
          {errors.img_url && <span className="text-red-500">{errors.img_url}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="w-full p-3 mt-2 border rounded-lg shadow-sm"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Haqqınızda</label>
          <textarea
            name="about"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.about}
            className="w-full p-3 mt-2 border rounded-lg shadow-sm"
          />
          {errors.about && <span className="text-red-500">{errors.about}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Təhsil</label>
          {Array.isArray(values.education) && values.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`education[${index}]`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={edu}
                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
              />
              {errors.education && errors.education[index] && (
                <span className="text-red-500">{errors.education[index]}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("education")}
            className="text-blue-500 hover:underline"
          >
            Təhsil əlavə et
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">İş Təcrübəsi</label>
          {Array.isArray(values.workExperience) && values.workExperience.map((work, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`workExperience[${index}]`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={work}
                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
              />
              {errors.workExperience && errors.workExperience[index] && (
                <span className="text-red-500">{errors.workExperience[index]}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("workExperience")}
            className="text-blue-500 hover:underline"
          >
            İş təcrübəsi əlavə et
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Bacarıqlar</label>
          {Array.isArray(values.skills) && values.skills.map((skill, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`skills[${index}]`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={skill}
                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
              />
              {errors.skills && errors.skills[index] && (
                <span className="text-red-500">{errors.skills[index]}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("skills")}
            className="text-blue-500 hover:underline"
          >
            Bacarıq əlavə et
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4"
        >
          Göndər
        </button>
      </form>
    </div>
  );
}

export default GenerateCV;
