import React, { useState } from 'react';
import './MedicalProtocolSelector.css'; // Import the CSS file
import logo from './assets/logo.png';

const protocolData = {
  "ACREH ou ACRIH": {
    "rythme sinusal": "HEAVENwARD",
    "Nécessité de NAD": "HYVAPRESS",
    "NAD et lactate > 2": "AREG-SHOCK",
    "Absence de réveil à H 48": ["EXPRESSCOMA","PRECOM"],
    "Nécessité d'une dialyse": "ICRAKI",
    "ACR extrahospitalier à l’admission": "HYPERION2",
    "ACR intra et extrahospitalier": "OVERCOOL"
  },
  "Sepsis / Choc septique": {
    "Tous chocs septiques": "AREG-SHOCK",
    "Immunosuppression": "COMBINATION-LOCK",
    "Pneumopathie aiguë communautaire": ["ESSCAPE","RECORDS"],
    "PAVM": ["IGNORANT"],
    "Infection respiratoire virale": ["SEVARVIR","RECORDS","ESSCAPE","OPTIFLU"], 
    "Infection à Enterobact BLSE": "PITAGORE",
    "Infection nécrosante de la peau": ["SKIN-ICU","VACATION"],
    "Dialyse (patient sous VMI et/ou NAD)": "ICRAKI",
    "Intubation": "NESOI-2",
    "NAD et intubé": "NUTRIREA-4",
    "Sepsis sévère sous NAD": "REGENERON",
    "Sepsis à P.aeruginosa DTR": "ADDICT"

  },
  "SDRA – NAD et intubé – syndrome hemophagocytaire": {
    "NAD et intubé": "NUTRIREA-4",
    "SDRA": "IVOLIA",
    "Syndrome hémophagocytaire": "JAKAHDI"
  },
  "Procedure": {
    "Extubation": "SYSTOWEAN",
    "Dialyse": "ICRAKI"
  },
  "Patient intubé > 48H": {
    "Obésité / BPCO / Cardiopathie >48h": "SYSTOWEAN",
    "Recherche BMR à l'admission >48h d'intubation": "TANGERINE",
    "Patient intubé depuis >48H et <120H": "RELIEF",
    "SDRA": "IVOLIA"
  }
};


const MedicalProtocolSelector = () => {
  const [selectedPathologie, setSelectedPathologie] = useState('');
  const [selectedCriteres, setSelectedCriteres] = useState([]);

  const handlePathologieChange = (pathologie) => {
    setSelectedPathologie(pathologie);
    setSelectedCriteres([]);
  };

  const handleCritereChange = (critere) => {
    const newSelectedCriteres = selectedCriteres.includes(critere)
      ? selectedCriteres.filter(c => c !== critere)
      : [...selectedCriteres, critere];
    
    setSelectedCriteres(newSelectedCriteres);
  };

  const uniquePathologies = Object.keys(protocolData).sort();

  const availableCriteres = selectedPathologie
    ? Object.keys(protocolData[selectedPathologie])
    : [];

    const matchedProtocols = Array.from(new Set(
      selectedCriteres.flatMap(critere => {
        const protocol = protocolData[selectedPathologie][critere];
        return Array.isArray(protocol) ? protocol : [protocol];
      })
    ));

  return (
    <div className="container">
      <img src={logo} alt="Assistance Publique - Hôpitaux de Paris" className="logo" />
      <h1 className="title">Medical Protocol Selector</h1>

      {/* Pathologie Selection */}
      <div className="section">
        <h2 className="subtitle">Select the Main Pathology:</h2>
        <select 
          value={selectedPathologie} 
          onChange={(e) => handlePathologieChange(e.target.value)}
          className="select"
        >
          <option value="">Choose a pathology</option>
          {uniquePathologies.map(pathologie => (
            <option key={pathologie} value={pathologie}>
              {pathologie}
            </option>
          ))}
        </select>
      </div>

      {/* Criteres Selection */}
      {selectedPathologie && (
        <div className="section">
          <h2 className="subtitle">Select the Essential Criteria:</h2>
          {availableCriteres.map(critere => (
            <div key={critere} className="checkbox-container">
              <input
                type="checkbox"
                id={critere}
                checked={selectedCriteres.includes(critere)}
                onChange={() => handleCritereChange(critere)}
                className="checkbox"
              />
              <label htmlFor={critere} className="checkbox-label">{critere}</label>
            </div>
          ))}
        </div>
      )}

      {/* Matched Protocols */}
      {matchedProtocols.length > 0 && (
        <div className="result">
          <h2 className="result-title">Matching Protocols:</h2>
          <div className="sticker-container">
            {matchedProtocols.map((protocol, index) => (
              <a 
              key={protocol}
                href={process.env.PUBLIC_URL + `/protocols/${encodeURIComponent(protocol)}.pdf`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="sticker"
              >
                {protocol}
              </a>
            ))}
          </div>
          <p className="instruction-text">Click to display the procedure</p>
        </div>
      )}
    </div>
  );
};

export default MedicalProtocolSelector;