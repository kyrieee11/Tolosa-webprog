import { useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #print-area, #print-area * {
              visibility: visible;
            }

            #print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white;
              padding: 30px;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <Stack
        className="no-print"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700}>
          Reports
        </Typography>

        <Button variant="contained" onClick={handlePrint}>
          Print Report
        </Button>
      </Stack>

      <Box
        id="print-area"
        ref={printRef}
        sx={{
          maxWidth: 760,
          mx: "auto",
          bgcolor: "white",
          p: 4,
          borderRadius: 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          Reports Summary
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Analytics overview for generated reports, category breakdown, and
          completion performance.
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Prepared on April 28, 2026 at 9:24 AM
        </Typography>

        <Card sx={{ mt: 3, borderRadius: 1, boxShadow: "none", border: "1px solid #e5e7eb" }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>
              Monthly Report Output
            </Typography>

            <Typography variant="caption" color="text.secondary">
              This chart compares how many reports were generated and completed
              across the last four months.
            </Typography>

            <BarChart
              series={[
                { data: [35, 44, 38, 50], label: "Generated" },
                { data: [22, 30, 28, 40], label: "Completed" },
              ]}
              height={260}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr"],
                  scaleType: "band",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ mt: 3, borderRadius: 1, boxShadow: "none", border: "1px solid #e5e7eb" }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>
              Report Category Share
            </Typography>

            <Typography variant="caption" color="text.secondary">
              This chart shows the distribution of report requests by category.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: "Sales" },
                      { id: 1, value: 25, label: "Users" },
                      { id: 2, value: 20, label: "Inventory" },
                      { id: 3, value: 20, label: "Finance" },
                    ],
                  },
                ]}
                width={360}
                height={260}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ReportsPage;