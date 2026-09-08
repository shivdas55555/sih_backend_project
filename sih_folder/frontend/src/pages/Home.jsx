import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://sih-backend-project.onrender.com/api";

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/problems`)
      .then((res) => {
        setProblems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching problems:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600">
        Loading platform data...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Problem Statements</h1>
        <Link
          to="/submit-problem"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Submit Problem
        </Link>
      </div>

      {problems.length === 0 ? (
        <p className="text-gray-500">
          No problems submitted yet. Be the first!
        </p>
      ) : (
        <div className="grid gap-6">
          {problems.map((prob) => (
            <div
              key={prob._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                {prob.category || "General"}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 mt-2">
                {prob.title}
              </h2>
              <p className="text-gray-600 mt-1">{prob.description}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  By: {prob.submittedBy || "Anonymous"}
                </span>
                <Link
                  to={`/problem/${prob._id}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Solutions & Submit Idea →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
