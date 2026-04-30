// pages/DashboardPages/ReportsPage.jsx
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge } from "@mui/x-charts/Gauge";

const ReportsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Gauge width={120} height={120} value={75} />
        <Gauge width={120} height={120} value={50} valueMin={10} valueMax={60} />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <BarChart
          series={[
            { data: [35, 44, 24, 34], label: "Series 1" },
            { data: [51, 6, 49, 30], label: "Series 2" },
          ]}
          height={300}
          xAxis={[
            {
              data: ["Q1", "Q2", "Q3", "Q4"],
              scaleType: "band",
              label: "Quarters",
            },
          ]}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Series A" },
                { id: 1, value: 15, label: "Series B" },
                { id: 2, value: 20, label: "Series C" },
              ],
            },
          ]}
          width={250}
          height={250}
        />
      </Stack>
    </Box>
  );
};

export default ReportsPage;