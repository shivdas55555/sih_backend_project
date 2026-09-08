import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://sih-backend-project.onrender.com/api";

const SubmitProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technology",
    submittedBy: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/problems`, formData);
      alert("Problem submitted successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to submit problem.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Submit a New Problem
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Title
          </label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded mt-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option>Technology</option>
            <option>Agriculture</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Smart Automation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            rows="4"
            className="w-full border p-2 rounded mt-1"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Name / Organization (Optional)
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g. Student, Innovator, Team Alpha"
            value={formData.submittedBy}
            onChange={(e) =>
              setFormData({ ...formData, submittedBy: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
        >
          {submitting ? "Submitting..." : "Publish Problem"}
        </button>
      </form>
    </div>
  );
};

export default SubmitProblem;
