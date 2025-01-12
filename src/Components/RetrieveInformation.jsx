import React, { useState } from "react";

const RetrieveInformation = () => {
  const [aadhar, setAadhar] = useState("");
  const [result, setResult] = useState(null);

  const retrieveInfo = () => {
    const persons = JSON.parse(localStorage.getItem("persons")) || [];
    const match = persons.find((person) => person.aadhar === aadhar);
    setResult(match || "No match found");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <label className="block font-bold mb-2">Enter Aadhar Number:</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button
        onClick={retrieveInfo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retrieve Information
      </button>
      <div className="mt-4">
        {result ? (
          typeof result === "string" ? (
            <p className="text-red-500">{result}</p>
          ) : (
            <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Name</th>
                  <th className="border border-gray-300 px-2 py-1">Date of Birth</th>
                  <th className="border border-gray-300 px-2 py-1">Aadhar Number</th>
                  <th className="border border-gray-300 px-2 py-1">Mobile Number</th>
                  <th className="border border-gray-300 px-2 py-1">Age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">{result.name}</td>
                  <td className="border border-gray-300 px-2 py-1">{result.dob}</td>
                  <td className="border border-gray-300 px-2 py-1">{result.aadhar}</td>
                  <td className="border border-gray-300 px-2 py-1">{result.mobile}</td>
                  <td className="border border-gray-300 px-2 py-1">{result.age}</td>
                </tr>
              </tbody>
            </table>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default RetrieveInformation;
