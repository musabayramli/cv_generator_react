import React from "react";
import { jsPDF } from "jspdf";

function PreviewCv({ form }) {

  const downloadPDF = () => {
    if (!form) {
      alert("Form data is missing.");
      return;
    }

    const doc = new jsPDF();

    doc.text(`Full Name: ${form.fullName || "Not available"}`, 10, 10);
    doc.text(`Email: ${form.email || "Not available"}`, 10, 20);
    doc.text(`About: ${form.about || "Not available"}`, 10, 30);


    doc.text("Education:", 10, 40);
    if (form.education && form.education.length > 0) {
      form.education.forEach((edu, index) => {
        doc.text(`- ${edu}`, 10, 50 + index * 10);
      });
    } else {
      doc.text("No education details available", 10, 50);
    }


    doc.text("Work Experience:", 10, 70);
    if (form.workExperience && form.workExperience.length > 0) {
      form.workExperience.forEach((work, index) => {
        doc.text(`- ${work}`, 10, 80 + index * 10);
      });
    } else {
      doc.text("No work experience details available", 10, 80);
    }


    doc.text("Skills:", 10, 100);
    if (form.skills && form.skills.length > 0) {
      form.skills.forEach((skill, index) => {
        doc.text(`- ${skill}`, 10, 110 + index * 10);
      });
    } else {
      doc.text("No skills details available", 10, 110);
    }


    doc.save("CV.pdf");
  };


  if (!form) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
          src={form.img_url || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
        <h3 className="ml-4 text-3xl font-bold text-gray-800">{form.fullName}</h3>
      </div>

      <div className="mt-6">
        <p className="text-lg text-gray-700">Email: {form.email}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-semibold text-gray-800">About</h4>
        <p className="text-lg text-gray-700">{form.about || "Not available"}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-semibold text-gray-800">Education</h4>
        <ul>
          {form.education && form.education.length > 0 ? (
            form.education.map((edu, index) => (
              <li key={index} className="text-lg text-gray-700">
                {edu}
              </li>
            ))
          ) : (
            <li className="text-lg text-gray-700">No education details available</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-semibold text-gray-800">Work Experience</h4>
        <ul>
          {form.workExperience && form.workExperience.length > 0 ? (
            form.workExperience.map((work, index) => (
              <li key={index} className="text-lg text-gray-700">
                {work}
              </li>
            ))
          ) : (
            <li className="text-lg text-gray-700">No work experience details available</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-semibold text-gray-800">Skills</h4>
        <ul>
          {form.skills && form.skills.length > 0 ? (
            form.skills.map((skill, index) => (
              <li key={index} className="text-lg text-gray-700">
                {skill}
              </li>
            ))
          ) : (
            <li className="text-lg text-gray-700">No skills details available</li>
          )}
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white p-3 rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default PreviewCv;
