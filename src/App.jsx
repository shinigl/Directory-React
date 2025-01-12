import React, { useState } from "react";
import AddNewPerson from "./Components/AddNewPerson";
import RetrieveInformation from "./Components/RetrieveInformation";


const App = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Person Management App</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add New Person
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            activeTab === "retrieve" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("retrieve")}
        >
          Retrieve Information
        </button>
      </div>
      {activeTab === "add" ? <AddNewPerson /> : <RetrieveInformation />}
    </div>
  );
};

export default App;
