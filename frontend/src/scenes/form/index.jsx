import { useState } from "react";
import data from './data.json';
import valsadData from '../../data/valsad f.json';
import vadodraData from '../../data/vadodra f.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './index.css';

const Form = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [villageDetails, setVillageDetails] = useState(null);

  const states = data.map(item => item.state);
  const districts = selectedState ? data.find(item => item.state === selectedState)?.districts : [];
  const subDistricts = selectedDistrict ? districts.find(item => item.district === selectedDistrict)?.subDistricts : [];
  const villages = selectedSubDistrict ? subDistricts.find(item => item.subDistrict === selectedSubDistrict)?.villages : [];

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

  const downloadPDF = () => {
    setTimeout(() => {
      const input = document.getElementById('village-details-table'); // Get the table element
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // Width of the PDF page
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('village-details.pdf'); // Save the PDF
      });
    }, 100); // Delay to ensure the table is rendered
  };

  return (
    <div>
      <div className='container'>
        <h3>Search Location</h3>
        <div className='select-container'>
          <div className="option-container">
          <p>State</p>
          <select
            name="state"
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

          <div className="option-container">
          <p>District</p>
          <select
            name="district"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedSubDistrict('');
              setSelectedVillage('');
              setVillageDetails(null);
            }}
          >
            <option value="">Select District</option>
            {districts?.map((district, index) => (
              <option key={index} value={district.district}>{district.district}</option>
            ))}
          </select>

          <div className="option-container">
          </div>
          <p>Sub-District</p>
          <select
            name="subDistrict"
            value={selectedSubDistrict}
            onChange={(e) => {
              setSelectedSubDistrict(e.target.value);
              setSelectedVillage('');
              setVillageDetails(null);
            }}
          >
            <option value="">Select Sub-District</option>
            {subDistricts?.map((subDistrict, index) => (
              <option key={index} value={subDistrict.subDistrict}>{subDistrict.subDistrict}</option>
            ))}
          </select>
          </div>

         <div className="option-container"> 
         <p>Village</p>
          <select
            name="village"
            value={selectedVillage}
            onChange={(e) => handleVillageSelection(e.target.value)}
          >
            <option value="">Select Village</option>
            {villages?.map((village, index) => (
              <option key={index} value={village}>{village}</option>
            ))}
          </select>
        </div>
      </div>
      </div>

      {villageDetails && (
        <div className="village-details">
          <h3>Village Details</h3>
          <button onClick={downloadPDF} style={{ marginBottom: '10px' }}>Download PDF</button>
          <table id="village-details-table">
            <thead>
              <tr>
                <th>Village Code</th>
                <th>Name</th>
                <th>State Name</th>
                <th>District Name</th>
                <th>Total Population</th>
                <th>Male Population</th>
                <th>Female Population</th>

                <th>Population (0-10 years)</th>
                <th>Population (0-10 years) Male</th>
                <th>Population (0-10 years) Female</th>
                <th>Population (11-18 years) </th>
                <th>Population (11-18 years) Male</th>
                <th>Population (11-18 years) Female</th>
                <th>Population (19-59 years) </th>
                <th>Population (19-59 years) Male</th>
                <th>Population (19-59 years) Female</th>
                <th>Population (60+ years) </th>
                <th>Population (60+ years) Male</th>
                <th>Population (60+ years) Female</th>

                <th>Total Worker Population</th>
                <th>Main Working Population</th>
               
                <th>Main Agricultural Labourers Population</th>
                <th>Main Agricultural Labourers Population Male</th>
                <th>Main Agricultural Labourers Population Female</th>
                <th>Marginal Agricultural Labourers Population </th>
                <th>Marginal Agricultural Labourers Population Male</th>
                <th>Marginal Agricultural Labourers Population Female</th>

                <th>Main Cultivator Population</th>
                <th>Main Cultivator Population Male</th>
                <th>Main Cultivator Population Female</th>
               
                <th>Marginal Cultivator Population</th>
                <th>Marginal Cultivator Population Male</th>
                <th>Marginal Cultivator Population Female</th>
                
                <th>Non-Working Population</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{villageDetails['Town/Village_Code']}</td>
                <td>{villageDetails.Name}</td>
                <td>{villageDetails['State/UTs_Name']}</td>
                <td>{villageDetails['District_Name']}</td>
                <td>{villageDetails['Total Population Person']}</td>
                <td>{villageDetails['Total Population Male']}</td>
                <td>{villageDetails['Total Population Female']}</td>
               
                <td>{villageDetails['Population in the age group 0-10 Person']}</td>
                <td>{villageDetails['Population in the age group 0-10 Male']}</td>
                <td>{villageDetails['Population in the age group 0-10 Female']}</td>
                <td>{villageDetails['Population in the age group 11-18 Person']}</td>
                <td>{villageDetails['Population in the age group 11-18 Male']}</td>
                <td>{villageDetails['Population in the age group 11-18 Female']}</td>
                <td>{villageDetails['Population in the age group 19-59 Person']}</td>
                <td>{villageDetails['Population in the age group 19-59 Male']}</td>
                <td>{villageDetails['Population in the age group 19-59 Female']}</td>
                <td>{villageDetails['Population in the age group 60+ Person']}</td>
                <td>{villageDetails['Population in the age group 60+ Male']}</td>
                <td>{villageDetails['Population in the age group 60+ Female']}</td>
                <td>{villageDetails['Total Worker Population Person']}</td>
                <td>{villageDetails['Main Working Population Person']}</td>

                <td>{villageDetails['Main Agricultural Labourers Population Person']}</td>
                <td>{villageDetails['Main Agricultural Labourers Population Male']}</td>
                <td>{villageDetails['Main Agricultural Labourers Population Female']}</td>

                <td>{villageDetails['Marginal Agriculture Labourers Population Person']}</td>
                <td>{villageDetails['Marginal Agriculture Labourers Population Male']}</td>
                <td>{villageDetails['Marginal Agriculture Labourers Population Female']}</td>


                <td>{villageDetails['Main Cultivator Population Person']}</td>
                <td>{villageDetails['Main Cultivator Population Male']}</td>
                <td>{villageDetails['Main Cultivator Population Female']}</td>

                <td>{villageDetails['Marginal Cultivator Population Person']}</td>
                <td>{villageDetails['Marginal Cultivator Population Male']}</td>
                <td>{villageDetails['Marginal Cultivator Population Female']}</td>
                

                <td>{villageDetails['Non Working Population Person']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
