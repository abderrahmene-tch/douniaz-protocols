import React, { useState } from 'react';
import './MedicalProtocolSelector.css'; // Import the CSS file
import logo from './assets/logo.png';

const protocolData = {
  "ACREH et/ou ACRIH": {
    "rythme sinusal": "HEAVENWARD",
    "Nécessité de NAD": "HYVAPRESS",
    "NAD et lactate > 2": "AREG SHOCK",
    "Absence de réveil à H 48": "EXPRESSCOMA, PRECOM",
    "Nécessité d'une dialyse": "ICRAKI"
  },
  "Sepsis / Choc septique": {
    "Tous chocs septiques": "AREG SHOCK",
    "Immunosuppression": "COMBINATION LOCK",
    "Pneumopathie aiguë communautaire": "ESSCAPE",
    "PAVM": "RECORDS",
    "Infection respiratoire virale": "SEVAVIR",
    "Infection à Enterobact BLSE": "PITAGORE",
    "Infection nécrosante de la peau": "SKIN ICU",
    "Dialyse (patient sous VMI et/ou NAD)": "ICRAKI",
    "Intubation": "NESOI 2",
    "Si BPCO et infection respiratoire": "CORTICOP"
  },
  "Autres Pathologies": {
    "NAD et VMI": "NUTRIREA 4",
    "Intubation": "NESOI 2",
    "VMI et NAD": "NUTRIREA 4",
    "BPCO": "CORTICOP",
    "Dialyse du patient ventilé et/ou sous NAD": "ICRAKI",
    "Extubation": "SYSTOWEAN",
    "SDRA": "IVOLIA",
    "Syndrome hémophagocytaire": "JAKAHDI"
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

  const matchedProtocols = selectedCriteres.map(critere => protocolData[selectedPathologie][critere]);

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
              <span key={index} className="sticker">{protocol}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalProtocolSelector;