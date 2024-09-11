import { useState } from "react";
import axios from 'axios';
import data from '../scenes/form/data.json';
import valsadData from '../data/valsad f.json';
import vadodraData from "../data/vadodra f.json";
import ChartView from "./ChartView";
import ResultsView from "./ResultsView";
// import HashLoader from "./HashLoader";
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

  const handleShowResults = async () => {
    if (villageDetails) {
      setIsLoading(true); // Start loading
      setView('results'); // Switch to the results view

      try {
        // Simulate API call with setTimeout
        setTimeout(async () => {
          try {
            const response = await axios.post('http://localhost:3000/predict', {
              city_name: selectedVillage
            });
            const apiData = response.data;
            setSchemeResults(apiData); // Set the API data
            setIsLoading(false); // Stop loading after data is fetched
          } catch (error) {
            console.error("Error fetching API data:", error);
            setIsLoading(false); // Stop loading even if there's an error
            alert('Failed to fetch API results');
          }
        }, 0); // Simulate 2 seconds delay for API response
      } catch (error) {
        console.error("Error fetching API data:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    } else {
      alert('Please select a village first.');
    }
  };

  return (
    <div>
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
          <button className="Show-chart" onClick={handleShowChart}>Show Charts</button>
        </div>
      )}

      {view === 'charts' && villageDetails && !isLoading && (
        <div className="full-page-chart">
          <div >
        <button className="Show-results" onClick={handleShowResults}>Show Results</button>
      </div>
          {/* ChartView rendering the village details */}
          <ChartView villageDetails={villageDetails} />

          {/* The "Show Results" button is now moved below the charts */}
          
        </div>
      )}
     

      {isLoading && (
        <div className="loader">
          {/* Display loader while fetching the data */}
          {/* <p>Loading...</p> */}
          <HashLoader color="#36D7B7" size={60} />
          {/* <HashLoader /> */}
          {/* <HashLoader/> */}
        </div>
      )}

      {view === 'results' && schemeResults && !isLoading && (
        <div className="full-page-results">
          <ResultsView results={schemeResults}  villageName={selectedVillage} />
        </div>
      )}
    </div>
  );
};

export default ChartComponent;




