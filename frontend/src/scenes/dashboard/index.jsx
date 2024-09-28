import { Box, Button, IconButton, Typography, useTheme, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SavingsIcon from '@mui/icons-material/Savings';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


import DashboardLineChart from "../../components/DashboardLineChart"; // Adjust path if needed

// Mock transactions data (make sure this is defined if you're using it)
const mockTransactions = [
  { txId: "SSA Mela", user: "GyanJyoti Public School", date: "15-10-24", cost: "View" },
  { txId: "SCSS Awareness", user: "Jamburi maidan", date: "29-12-24", cost: "View" },
  { txId: "PLI Drive", user: "Jamburi Maidan", date: "17-01-25", cost: "View" },
  { txId: "SSA Mela", user: "GyanJyoti Public School", date: "15-10-24", cost: "View" },
  { txId: "SCSS Awareness", user: "Jamburi maidan", date: "29-12-24", cost: "View" },
  { txId: "PLI Drive", user: "Jamburi Maidan", date: "17-01-25", cost: "View" },
  { txId: "SSA Mela", user: "GyanJyoti Public School", date: "15-10-24", cost: "View" },
  { txId: "SCSS Awareness", user: "Jamburi maidan", date: "29-12-24", cost: "View" },
  { txId: "PLI Drive", user: "Jamburi Maidan", date: "17-01-25", cost: "View" },

  // Add more mock transactions as needed
];
const customerDemographicsData = [
  { id: 'Children', label: 'Children', value: 25, color: 'hsl(348, 70%, 50%)' },
  { id: 'Adults', label: 'Adults', value: 50, color: 'hsl(91, 70%, 50%)' },
  { id: 'Seniors', label: 'Seniors', value: 25, color: 'hsl(209, 70%, 50%)' },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Schemes and selected scheme state
  const schemes = ["Senior Citizens Savings Scheme Account",
    "Sukanya Samriddhi Account",
    "Kisan Vikas Patra",
    "Mahila Samman Savings Certificate",
    "Public Provident fund",
    "Postal Life Insurance",
    "Rural Postal Life Insurance"
  ];
  const [selectedScheme, setSelectedScheme] = useState(schemes[0]);

  const villages = [
    "Rajpura", "Udalpur", "Tulsigam", "Vachchhesar", "Jambu Goral", "Varsada", "Waghpura",
    "Tansiya", "Himmatpura", "Dungripura(I)", "Intvad", "Nani Varnoli (Vanto)", "Desar",
    "Valavav", "Vejpur", "Jesar Gopari", "Vaktapura", "Kadachhala", "Manekla", "Moti Varnoli",
    "Nani Varnoli", "Chhalier", "Vankaneda", "Ghemalpura", "Dolatpura", "Pipalchhat Vanto",
    "Rampuri-Narpuri", "Vadiya (Pandu)", "Rajupura", "Limdanu Muvadu", "Kalyan Patelnu Muvadu",
    "Rajpur", "Pratappura", "Shihora", "Gorsan", "Vaghanu Muvadu",
  ];
  const [selectedvillage, setSelectedvillage] = useState(villages[0]);

  // Function to handle scheme selection
  const handleSchemeChange = (event) => {
    setSelectedScheme(event.target.value);
  };
  const handlevillageChange = (event) => {
    setSelectedvillage(event.target.value);
  };

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update the current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString("en-IN", options);
    setCurrentDate(formattedDate);

    // Update the current time every second
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(formattedTime);
    };

    // Call the function once and then set an interval
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);


  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString("en-IN", options); // You can change locale as needed
    setCurrentDate(formattedDate);
  }, []);
  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box display="flex" alignItems="center" gap="20px">
          <Typography
            variant="h6"
            color={colors.grey[100]}
            sx={{
              fontSize: "16px",       // Adjust the font size
              fontWeight: "bold",      // Make it bold
              marginRight: "20px",     // Add some spacing to the right
              backgroundColor: colors.blueAccent[700], // Add background color if desired
              padding: "10px 20px",     // Add padding for better spacing
              borderRadius: "3px",     // Add a slight border radius
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow for effect
            }}
          >
            <span style={{ marginRight: "10px" }}>{currentTime}</span>
            <span>{currentDate}</span>
          </Typography>

          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* SCHEME SELECTION */}
      <Box>
        <Box display="flex" gap="1rem" justifyContent="flex-start" alignItems="center" mb="20px">
          <Typography variant="h6" color={colors.grey[100]} mr="10px">
            Select Scheme:
          </Typography>
          <Select value={selectedScheme} onChange={handleSchemeChange} sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
            {schemes.map((scheme) => (
              <MenuItem key={scheme} value={scheme}>
                {scheme}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" gap="1rem" justifyContent="flex-start" alignItems="center" mb="20px">
          <Typography variant="h6" color={colors.grey[100]} mr="10px">
            Select Village:
          </Typography>
          <Select value={selectedvillage} onChange={handlevillageChange} sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
            {villages.map((village) => (
              <MenuItem key={village} value={village}>
                {village}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 - Stat Boxes */}
        {/* ROW 1 - Stat Boxes */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="44,441"
            subtitle="Total Population"
            icon={<GroupIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          // No progress or increase props here to remove the progress circle
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="25,134"
            subtitle="Traffic Generated"
            progress="0.30"
            increase="+43%"
            icon={<PeopleOutlineIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="15,345"
            subtitle="Total Accounts Opened"
            progress="0.50"
            increase="+21%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>




        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Rs 1,12,361"
            subtitle="Total Funds Deposited"
            progress="0.75"
            increase="+14%"
            icon={<CurrencyRupeeIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>







        {/* ROW 2 - Line Chart and Recent Transactions */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              {selectedScheme} Progress Chart
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <DashboardLineChart isDashboard={true} scheme={selectedScheme} />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} colors={colors.grey[100]} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Upcoming Melas
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box key={`${transaction.txId}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box backgroundColor="#F59E0C" color="black" p="5px 10px" borderRadius="4px">
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box >


  );
};

export default Dashboard;
