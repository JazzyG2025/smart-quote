
const { useState } = React;

const RATE_DATA = {
  Plumbing: {
    NSW: {
      Normal: { callOut: 45, rate: 79.19 },
      "After Hours": { callOut: 60, rate: 124.33 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 144.4 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    },
    VIC: {
      Normal: { callOut: 45, rate: 79.19 },
      "After Hours": { callOut: 60, rate: 124.33 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 144.4 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    }
  },
  Electrician: {
    NSW: {
      Normal: { callOut: 45, rate: 76.31 },
      "After Hours": { callOut: 60, rate: 124.33 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 144.4 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    },
    VIC: {
      Normal: { callOut: 45, rate: 76.31 },
      "After Hours": { callOut: 60, rate: 124.33 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 144.4 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    }
  },
  Carpenter: {
    NSW: {
      Normal: { callOut: 45, rate: 70.62 },
      "After Hours": { callOut: 60, rate: 107.16 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 127.6 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    },
    WA: {
      Normal: { callOut: 45, rate: 76.36 },
      "After Hours": { callOut: 60, rate: 107.16 },
      Saturday: { callOut: 60, rate: 134.5 },
      Sunday: { callOut: 60, rate: 127.6 },
      "Public Holiday": { callOut: 60, rate: 149.2 }
    }
  }
};

function QuoteApp() {
  const [trade, setTrade] = useState("Plumbing");
  const [state, setState] = useState("NSW");
  const [rateType, setRateType] = useState("Normal");
  const [hours, setHours] = useState(1);
  const [includeCallOut, setIncludeCallOut] = useState(false);
  const [materials, setMaterials] = useState([{ name: "", cost: "" }]);
  const [wasteCost, setWasteCost] = useState(0);
  const [travelCost, setTravelCost] = useState(0);

  const rates = RATE_DATA[trade]?.[state]?.[rateType] || { callOut: 0, rate: 0 };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const addMaterial = () => setMaterials([...materials, { name: "", cost: "" }]);
  const removeMaterial = (index) => {
    const updated = [...materials];
    updated.splice(index, 1);
    setMaterials(updated);
  };

  const materialsTotal = materials.reduce((sum, m) => sum + parseFloat(m.cost || 0), 0);
  const labourCost = hours * rates.rate;
  const callOutCost = includeCallOut ? rates.callOut : 0;
  const total = labourCost + callOutCost + materialsTotal + parseFloat(wasteCost || 0) + parseFloat(travelCost || 0);

  return (
    <div>
      <h1>Quote Smart</h1>
      <div>
        <label>Trade:</label>
        <select value={trade} onChange={(e) => setTrade(e.target.value)}>
          {Object.keys(RATE_DATA).map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label>State:</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          {Object.keys(RATE_DATA[trade] || {}).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label>Rate:</label>
        <select value={rateType} onChange={(e) => setRateType(e.target.value)}>
          {["Normal", "After Hours", "Saturday", "Sunday", "Public Holiday"].map(rt => <option key={rt}>{rt}</option>)}
        </select>
      </div>
      <div>
        <label>Hours:</label>
        <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <div>
        <label>Include Call-Out Fee (${rates.callOut}):</label>
        <input type="checkbox" checked={includeCallOut} onChange={(e) => setIncludeCallOut(e.target.checked)} />
      </div>
      <div>
        <label>Waste Disposal Cost:</label>
        <input type="number" value={wasteCost} onChange={(e) => setWasteCost(e.target.value)} />
      </div>
      <div>
        <label>Travel Cost:</label>
        <input type="number" value={travelCost} onChange={(e) => setTravelCost(e.target.value)} />
      </div>
      <div className="materials">
        <h3>Materials</h3>
        {materials.map((mat, i) => (
          <div key={i}>
            <input placeholder="Name" value={mat.name} onChange={(e) => handleMaterialChange(i, "name", e.target.value)} />
            <input type="number" placeholder="Cost" value={mat.cost} onChange={(e) => handleMaterialChange(i, "cost", e.target.value)} />
            {materials.length > 1 && <button onClick={() => removeMaterial(i)}>Remove</button>}
          </div>
        ))}
        <button onClick={addMaterial}>Add Material</button>
      </div>

      <div className="quote-summary">
        <h3>Quote Summary</h3>
        <p>Labour: ${labourCost.toFixed(2)}</p>
        <p>Call-Out Fee: ${callOutCost.toFixed(2)}</p>
        <p>Materials: ${materialsTotal.toFixed(2)}</p>
        <p>Waste: ${parseFloat(wasteCost || 0).toFixed(2)}</p>
        <p>Travel: ${parseFloat(travelCost || 0).toFixed(2)}</p>
        <hr />
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<QuoteApp />);
