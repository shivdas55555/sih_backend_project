import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://sih-backend-project.onrender.com/api";

const Collaborate = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    contactEmail: "",
    collaborationDetails: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/collaborations`, formData);
      setSubmitted(true);
    } catch (err) {
      alert("Error submitting collaboration request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Institute Collaboration
      </h2>
      <p className="text-gray-600 mb-6">
        Connect your institution with ongoing innovation projects and solutions.
      </p>

      {submitted ? (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          Thank you! Your collaboration request has been registered.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Institute / Organization Name
            </label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded mt-1"
              value={formData.instituteName}
              onChange={(e) =>
                setFormData({ ...formData, instituteName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              type="email"
              required
              className="w-full border p-2 rounded mt-1"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({ ...formData, contactEmail: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collaboration Proposal / Details
            </label>
            <textarea
              required
              rows="4"
              className="w-full border p-2 rounded mt-1"
              placeholder="Describe how your institute wants to collaborate..."
              value={formData.collaborationDetails}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  collaborationDetails: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
          >
            Submit Collaboration Request
          </button>
        </form>
      )}
    </div>
  );
};

export default Collaborate;
