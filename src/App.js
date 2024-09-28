import React, { useState } from 'react';
import FamilyTree from './component/FamilyTree';
import './App.css';

function App() {
  const [familyData, setFamilyData] = useState({
    client: { name: "" },
    spouses: []
  });

  const [formData, setFormData] = useState({
    client: "",
    spouses: [{ name: "", children: [""] }],
  });

  // Handling the form input changes
  const handleInputChange = (index, event, spouseIndex) => {
    const { name, value } = event.target;
    const newFormData = { ...formData };

    if (name === "client") {
      newFormData.client = value;
    } else if (name === "spouseName") {
      newFormData.spouses[spouseIndex].name = value;
    } else if (name.startsWith("child")) {
      newFormData.spouses[spouseIndex].children[index] = value;
    }

    setFormData(newFormData);
  };

  // Adding new spouse entry
  const addSpouse = () => {
    setFormData({
      ...formData,
      spouses: [...formData.spouses, { name: "", children: [""] }],
    });
  };

  // Adding child entry for a specific spouse
  const addChild = (spouseIndex) => {
    const newSpouses = [...formData.spouses];
    newSpouses[spouseIndex].children.push("");
    setFormData({ ...formData, spouses: newSpouses });
  };

  // Submit form and update family tree data
  const handleSubmit = (event) => {
    event.preventDefault();
    const newFamilyData = {
      client: { name: formData.client },
      spouses: formData.spouses,
    };
    setFamilyData(newFamilyData);
  };

  return (
    <div className="App">
      <h1>Dynamic Family Tree</h1>
      <form onSubmit={handleSubmit} className="family-form">
        <fieldset>
          <legend>Client Information</legend>
          <label>Client Name:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={(e) => handleInputChange(null, e, null)}
            placeholder="Enter Client Name"
            required
          />
        </fieldset>

        {formData.spouses.map((spouse, spouseIndex) => (
          <fieldset key={spouseIndex} className="spouse-section">
            <legend>Spouse {spouseIndex + 1}:</legend>
            <label>Spouse Name:</label>
            <input
              type="text"
              name="spouseName"
              value={spouse.name}
              placeholder="Enter Spouse Name"
              onChange={(e) => handleInputChange(null, e, spouseIndex)}
              required
            />
            <label>Children:</label>
            {spouse.children.map((child, index) => (
              <div key={index} className="child-entry">
                <input
                  type="text"
                  name={`child${index}`}
                  value={child}
                  placeholder={`Child ${index + 1}`}
                  onChange={(e) => handleInputChange(index, e, spouseIndex)}
                />
              </div>
            ))}
            <button type="button" className="add-child-btn" onClick={() => addChild(spouseIndex)}>
              + Add Child
            </button>
          </fieldset>
        ))}
        <button type="button" className="add-spouse-btn" onClick={addSpouse}>
          + Add Spouse
        </button>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <FamilyTree familyData={familyData} />
    </div>
  );
}

export default App;
