import React, { useState } from "react";
import GenerateCV from "../GenerateCV";
import PreviewCv from "../PreviewCv";
import CvList from "../CvList";

function Home() {
  const [form, setForm] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cvList, setCvList] = useState([]);

  const handleFormSubmit = (formData) => {
    setForm(formData);
    setIsFormFilled(true);
  };

  const handleEditClick = (index) => {
    const cvToEdit = cvList[index];
    setForm(cvToEdit); 
    setIsEditing(true);
  };

  const handleAddCv = () => {
    setCvList([...cvList, form]); 
    setIsFormFilled(false);
    setForm({});
  };

  const handleDelete = (index) => {
    const updatedCvList = cvList.filter((_, i) => i !== index);
    setCvList(updatedCvList);
  };


  const handleDownloadPdf = () => {
    alert("Download PDF functionality to be implemented");
  };

  return (
    <>
      <div className="flex max-w-6xl mx-auto mt-10 space-x-8">
        <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <GenerateCV setForm={handleFormSubmit} form={form} isEditing={isEditing} />
        </div>

        <div className="w-2/3 bg-white shadow-lg p-6 rounded-lg">
          {isFormFilled ? (
            <PreviewCv form={form} />
          ) : (
            <p className="text-center text-gray-500">
              Formu doldurduqca CV burada görsənəcək.
            </p>
          )}

          {isFormFilled && (
            <div className="mt-8">
              <button
                onClick={handleDownloadPdf}
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                Download PDF
              </button>

              <button
                onClick={handleAddCv}
                className="bg-purple-500 text-white p-2 rounded mt-4"
              >
                Add CV
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-10">
        <CvList cvList={cvList} onEdit={handleEditClick} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default Home;
