import React from "react";

function CvList({ cvList, onEdit, onDelete }) {
  return (
    <div className="mt-10">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">CV List</h3>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Full Name</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Email</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cvList.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-3 px-6 text-gray-500">
                No CVs available
              </td>
            </tr>
          ) : (
            cvList.map((cv, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-6 text-gray-700">{cv.fullName}</td>
                <td className="py-3 px-6 text-gray-700">{cv.email}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => onEdit(index)} 
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CvList;
