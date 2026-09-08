import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance"; // Adjust import path to match your project setup

export default function SubmitProblem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Other",
    location: "",
    description: "",
    impactScore: "Medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await API.post("/tasks", formData);
      navigate("/challenges");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post challenge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Lighting Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-semibold text-green-400 mb-3">
            <span>✨ Civic Innovation Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Report a Problem Statement
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl">
            Highlight a real-world issue in Jharkhand. Submit detailed
            information so student researchers, universities, and industries can
            collaborate on solutions.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Form (Left 2 cols) */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-800/60 border border-slate-700/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            {error && (
              <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Problem Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Problem Title <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Unregulated Agricultural Waste Management in Ranchi"
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/80 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Category & Impact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Category <span className="text-green-400">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/80 focus:border-transparent transition"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Smart City">Smart City</option>
                    <option value="Governance">Governance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Estimated Impact <span className="text-green-400">*</span>
                  </label>
                  <select
                    name="impactScore"
                    value={formData.impactScore}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/80 focus:border-transparent transition"
                  >
                    <option value="Low">Low (Local Community)</option>
                    <option value="Medium">Medium (District Scale)</option>
                    <option value="High">High (State-Wide Impact)</option>
                  </select>
                </div>
              </div>

              {/* District / Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  District / Location <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhanbad, Bokaro, East Singhbhum"
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/80 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Detailed Description <span className="text-green-400">*</span>
                </label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide context: What is happening? Who does it affect? What solutions have failed so far?"
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/80 focus:border-transparent transition resize-none"
                  required
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-green-500 text-slate-950 font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 transition shadow-lg shadow-green-500/20 text-sm"
                >
                  {isSubmitting ? "Submitting..." : "Post Problem Statement →"}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar / Guidelines (Right 1 col) */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span>📋</span> Guidelines for Submission
              </h3>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span> Be specific about
                  the geographical area and population affected.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span> Avoid vague titles
                  like "Bad Roads". Use concise summaries.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span> Include measurable
                  context or numbers if available.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-6">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="text-sm font-bold text-white mb-1">
                What happens next?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Once reviewed, your problem will be published to the{" "}
                <b>Challenges Directory</b> where innovators and university
                teams can pick it up to prototype solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
