import { useState } from "react";
import { FaUser } from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">

      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaUser /> Customer Churn Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Gender */}
          <select name="Gender" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

          {/* Subscription */}
          <select name="Subscription Type" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Select Subscription</option>
            <option value="0">Basic</option>
            <option value="1">Standard</option>
            <option value="2">Premium</option>
          </select>

          {/* Age */}
          <select name="Age" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Select Age</option>
            <option value="20">18–25</option>
            <option value="30">26–35</option>
            <option value="40">36–45</option>
            <option value="50">46+</option>
          </select>

          {/* Tenure */}
          <select name="Tenure" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Select Tenure</option>
            <option value="6">0–6 months</option>
            <option value="12">6–12 months</option>
            <option value="24">1–2 years</option>
            <option value="36">2+ years</option>
          </select>

          {/* Usage */}
          <select name="Usage Frequency" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Usage Frequency</option>
            <option value="2">Low</option>
            <option value="5">Medium</option>
            <option value="8">High</option>
          </select>

          {/* Support */}
          <select name="Support Calls" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Support Calls</option>
            <option value="0">None</option>
            <option value="2">1–2</option>
            <option value="5">3–5</option>
            <option value="8">Frequent</option>
          </select>

          {/* Payment */}
          <select name="Payment Delay" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Payment Delay</option>
            <option value="0">On Time</option>
            <option value="5">Few Days</option>
            <option value="10">Late Often</option>
          </select>

          {/* Contract */}
          <select name="Contract Length" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Contract Length</option>
            <option value="6">6 months</option>
            <option value="12">1 year</option>
            <option value="24">2 years</option>
          </select>

          {/* Spend */}
          <select name="Total Spend" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Total Spend</option>
            <option value="500">Low</option>
            <option value="2000">Medium</option>
            <option value="5000">High</option>
            <option value="10000">Very High</option>
          </select>

          {/* Interaction */}
          <select name="Last Interaction" onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option value="">Last Interaction</option>
            <option value="5">Recent</option>
            <option value="20">Moderate</option>
            <option value="50">Old</option>
          </select>

          <button className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700 transition">
            Predict
          </button>

        </form>

        {/* Loading */}
        {loading && <p className="mt-4 text-center">Predicting...</p>}

        {/* Result */}
        {result && !loading && (
          <div className="mt-6 text-center">
            <h2 className={result.prediction === 1 ? "text-red-400" : "text-green-400"}>
              {result.prediction === 1 ? "⚠️ Churn Risk" : "✅ No Churn"}
            </h2>

            <p className="mt-2">
              Probability: {(result.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;