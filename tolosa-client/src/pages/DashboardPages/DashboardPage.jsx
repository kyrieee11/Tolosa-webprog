import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart } from "@mui/x-charts/PieChart";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const cardStyle = {
  borderRadius: 4,
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
};

function DashboardPage() {
  const averageAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        p: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#0f172a">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview summary, reports, and user information
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
              <Typography variant="h4" fontWeight={800} color="#0f172a">
                {rows.length}
              </Typography>
              <Typography variant="caption" color="success.main">
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Average Age
              </Typography>
              <Typography variant="h4" fontWeight={800} color="#0f172a">
                {averageAge}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on active records
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5} sx={{ mb: 3 }}>
        <Card sx={{ ...cardStyle, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Quarterly Sales
            </Typography>

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
          </CardContent>
        </Card>

        <Card sx={{ ...cardStyle, width: { xs: "100%", lg: 340 } }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              User Distribution
            </Typography>

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
              width={300}
              height={260}
            />
          </CardContent>
        </Card>
      </Stack>

      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Users Overview
          </Typography>

          <Box sx={{ height: 420, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#f1f5f9",
                  fontWeight: 700,
                },
                "& .MuiDataGrid-row:hover": {
                  bgcolor: "#f8fafc",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;