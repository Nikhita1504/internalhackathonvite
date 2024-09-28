import React, { useState } from "react";
import data from '../scenes/form/data.json';
import valsadData from '../data/valsad f.json';
import vadodraData from "../data/vadodra f.json";
import ChartView from "./ChartView";
import ResultsView from "./ResultsView";
import HashLoader from 'react-spinners/HashLoader';

const ChartComponent = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [villageDetails, setVillageDetails] = useState(null);
  const [schemeResults, setSchemeResults] = useState(null);
  const [view, setView] = useState('selection'); // To track the current view
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const states = data.map(item => item.state);
  const districts = selectedState ? data.find(item => item.state === selectedState)?.districts || [] : [];
  const subDistricts = selectedDistrict ? districts.find(item => item.district === selectedDistrict)?.subDistricts || [] : [];
  const villages = selectedSubDistrict ? subDistricts.find(item => item.subDistrict === selectedSubDistrict)?.villages || [] : [];

  const handleVillageSelection = (village) => {
    setSelectedVillage(village);
    let villageInfo = null;
    if (selectedDistrict === "Valsad") {
      villageInfo = valsadData.Sheet1.find(item => item.Name === village);
    } else if (selectedDistrict === "Vadodara") {
      villageInfo = vadodraData.Sheet1.find(item => item.Name === village);
    }
    setVillageDetails(villageInfo);
  };

  const handleShowChart = () => {
    if (villageDetails) {
      setView('charts'); // Switch to the chart view
    } else {
      alert('Please select a village first.');
    }
  };

  const handleShowResults = () => {
    if (villageDetails) {
      setIsLoading(true); // Start loading
      setView('results'); // Switch to the results view

      // Simulate API call with a timeout
      setTimeout(() => {
        const mockApiData = {
          scheme1: {
            name: "Scheme 1",
            value: 0.933,
            demographic: 'Senior Citizens',
            action: 'Organize SCSS-specific melas',
            time: 'April - June'
          },
          scheme2: {
            name: "Scheme 2",
            value: 0.82,
            demographic: 'Female Children below 10 years',
            action: 'Host workshops',
            time: 'June - July'
          },
          scheme3: {
            name: "Scheme 3",
            value: 0.80,
            demographic: 'Working Professionals',
            action: 'Increase awareness campaigns',
            time: 'January - March'
          },
          // Add more mock data as needed
        };

        setSchemeResults(Object.values(mockApiData)); // Set the simulated API data
        setIsLoading(false); // Stop loading after data is set
      }, 3000); // Simulating a 2-second delay
    } else {
      alert('Please select a village first.');
    }
  };

  return (
    <div>
      <div className="moving-strip">
        <p className="moving-text">
          Made only for Valsad and Vadodara districts of Gujarat.
        </p>
      </div>
      {view === 'selection' && (
        <div className='selection-container'>
          <h3>Select Location</h3>

          <div className='select-group'>
            <div className="option">
              <p>State</p>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                  setSelectedSubDistrict('');
                  setSelectedVillage('');
                  setVillageDetails(null);
                }}
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="option">
              <p>District</p>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedSubDistrict('');
                  setSelectedVillage('');
                  setVillageDetails(null);
                }}
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district.district}>{district.district}</option>
                ))}
              </select>
            </div>

            <div className="option">
              <p>Sub-District</p>
              <select
                value={selectedSubDistrict}
                onChange={(e) => {
                  setSelectedSubDistrict(e.target.value);
                  setSelectedVillage('');
                  setVillageDetails(null);
                }}
              >
                <option value="">Select Sub-District</option>
                {subDistricts.map((subDistrict, index) => (
                  <option key={index} value={subDistrict.subDistrict}>{subDistrict.subDistrict}</option>
                ))}
              </select>
            </div>

            <div className="option">
              <p>Village</p>
              <select
                value={selectedVillage}
                onChange={(e) => handleVillageSelection(e.target.value)}
              >
                <option value="">Select Village</option>
                {villages.map((village, index) => (
                  <option key={index} value={village}>{village}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="Show-chart" onClick={handleShowChart}>Generate Demographic Report</button>
        </div>
      )}

      {view === 'charts' && villageDetails && !isLoading && (
        <div className="full-page-chart">
          <div>
            <button className="Show-results" onClick={handleShowResults}>View Predictive Analysis</button>
          </div>
          {/* ChartView rendering the village details */}
          <ChartView villageDetails={villageDetails} villageName={selectedVillage} />
        </div>
      )}

      {isLoading && (
        <div className="loader">
          <HashLoader color="#36D7B7" size={60} />
        </div>
      )}

      {view === 'results' && schemeResults && !isLoading && (
        <div className="full-page-results">
          <ResultsView results={schemeResults} villageName={selectedVillage} />
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
