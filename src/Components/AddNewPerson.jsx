import React, { useState, useEffect } from "react";

const AddNewPerson = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = JSON.parse(localStorage.getItem("persons")) || [];
    setRows(savedRows);
  }, []);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), name: "", dob: "", aadhar: "", mobile: "", saved: false }]);
  };

  const saveRow = (index, person) => {
    if (!person.name || !person.dob || !person.aadhar || !person.mobile) {
      alert("All fields are required.");
      return;
    }
    if (!/^\d{12}$/.test(person.aadhar)) {
      alert("Aadhar Number must be 12 digits.");
      return;
    }
    if (!/^\d{10}$/.test(person.mobile)) {
      alert("Mobile Number must be 10 digits.");
      return;
    }

    const dob = new Date(person.dob);
    const currentDate = new Date();
    const age =
      currentDate.getFullYear() -
      dob.getFullYear() -
      (currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ? 1
        : 0);

    const updatedRows = rows.map((row, idx) =>
      idx === index ? { ...person, age, saved: true } : row
    );

    setRows(updatedRows);
    localStorage.setItem("persons", JSON.stringify(updatedRows)); // Save rows with age
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index);
    setRows(updatedRows);
    localStorage.setItem("persons", JSON.stringify(updatedRows));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Name</th>
              <th className="border border-gray-300 px-2 py-1">Date of Birth</th>
              <th className="border border-gray-300 px-2 py-1">Aadhar Number</th>
              <th className="border border-gray-300 px-2 py-1">Mobile Number</th>
              <th className="border border-gray-300 px-2 py-1">Age</th>
              <th className="border border-gray-300 px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border border-gray-300 px-2 py-1">
                  {row.saved ? (
                    row.name
                  ) : (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].name = e.target.value;
                        setRows(updatedRows);
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {row.saved ? (
                    row.dob
                  ) : (
                    <input
                      type="date"
                      value={row.dob}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].dob = e.target.value;
                        setRows(updatedRows);
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {row.saved ? (
                    row.aadhar
                  ) : (
                    <input
                      type="text"
                      value={row.aadhar}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].aadhar = e.target.value;
                        setRows(updatedRows);
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {row.saved ? (
                    row.mobile
                  ) : (
                    <input
                      type="text"
                      value={row.mobile}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].mobile = e.target.value;
                        setRows(updatedRows);
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {row.age || "-"}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {row.saved ? (
                    <button
                      onClick={() => deleteRow(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => saveRow(index, row)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Row
      </button>
    </div>
  );
};

export default AddNewPerson;
