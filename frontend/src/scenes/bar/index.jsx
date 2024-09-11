import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
// import  '/Users/nikhitadas/react-admin-dashboard/src/scenes/bar/bar.css'
import './bar.css'
const Bar = () => {
  return (
    <Box m="20px">

      <Box height="75vh">
        <BarChart  />
      </Box>
    </Box>
  );
};

export default Bar;
