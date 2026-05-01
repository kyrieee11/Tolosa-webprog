import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import usersSeed from "../../data/users.json";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const emptyForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "male",
  contactNumber: "",
  email: "",
  role: "viewer",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const inputSx = {
  flex: 1,
  minWidth: 0,
  "& .MuiInputBase-root": {
    height: 28,
    fontSize: 11,
  },
  "& .MuiInputLabel-root": {
    fontSize: 11,
    top: -4,
  },
  "& .MuiInputLabel-shrink": {
    top: 0,
  },
};

const UserPage = () => {
  const [users, setUsers] = useState(usersSeed);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const rows = users.map((user, index) => ({
    id: index + 1,
    fullName: `${user.firstName} ${user.lastName}`,
    ...user,
  }));

  const filteredRows = useMemo(() => {
    return rows.filter((user) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        user.firstName.toLowerCase().includes(keyword) ||
        user.lastName.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesGender = genderFilter === "all" || user.gender === genderFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [rows, search, roleFilter, genderFilter, statusFilter]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";

    if (!form.age.trim()) newErrors.age = "Required";
    else if (!/^\d+$/.test(form.age)) newErrors.age = "Number only";

    if (!form.contactNumber.trim()) newErrors.contactNumber = "Required";
    else if (!/^\d{11}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "11 digits";
    }

    if (!form.email.trim()) newErrors.email = "Required";

    if (!form.username.trim()) newErrors.username = "Required";
    else if (/\s/.test(form.username)) newErrors.username = "No spaces";

    if (!form.password.trim()) newErrors.password = "Required";
    else if (form.password.length < 8) newErrors.password = "Min 8 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleOpen = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setErrors({});
  };

  const handleEditUser = (row) => {
    setEditingId(row.id);
    setForm({
      firstName: row.firstName || "",
      lastName: row.lastName || "",
      age: String(row.age || ""),
      gender: row.gender || "male",
      contactNumber: row.contactNumber || "",
      email: row.email || "",
      role: row.role || "viewer",
      username: row.username || "",
      password: row.password || "",
      address: row.address || "",
      isActive: Boolean(row.isActive),
    });
    setErrors({});
    setOpen(true);
  };

  const handleSaveUser = () => {
    if (!validateForm()) return;

    const savedUser = {
      ...form,
      age: Number(form.age),
    };

    if (editingId) {
      setUsers((prev) =>
        prev.map((user, index) => (index + 1 === editingId ? savedUser : user))
      );
    } else {
      setUsers((prev) => [...prev, savedUser]);
    }

    handleClose();
  };

  const handleToggleStatus = (row) => {
    setUsers((prev) =>
      prev.map((user, index) =>
        index + 1 === row.id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setGenderFilter("all");
    setStatusFilter("all");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 55 },
    { field: "fullName", headerName: "Full Name", width: 170 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "role", headerName: "Role", width: 90 },
    {
      field: "isActive",
      headerName: "Status",
      width: 95,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          size="small"
          sx={{
            height: 18,
            fontSize: 10,
            fontWeight: 700,
            bgcolor: params.value ? "#2e7d32" : "#f8f8f8",
            color: params.value ? "#fff" : "#777",
            border: params.value ? "none" : "1px solid #cfcfcf",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 145,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.6}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditUser(params.row)}
            sx={{
              minWidth: 44,
              height: 24,
              fontSize: 10,
              fontWeight: 700,
              px: 1,
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleStatus(params.row)}
            sx={{
              minWidth: 66,
              height: 24,
              fontSize: 10,
              fontWeight: 700,
              px: 1,
              bgcolor: params.row.isActive ? "#ef6c00" : "#2e7d32",
              "&:hover": {
                bgcolor: params.row.isActive ? "#e65100" : "#1b5e20",
              },
            }}
          >
            {params.row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
  <Box
    sx={{
      p: 1.2,
      bgcolor: "#f5f7fb",
      minHeight: "calc(100vh - 64px)",
      overflow: "hidden",
    }}
  >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Typography variant="h6" fontWeight={700}>
          Users
        </Typography>

        <Button
          size="small"
          variant="contained"
          onClick={handleOpen}
          sx={{
            height: 26,
            fontSize: 10,
            fontWeight: 700,
            px: 1.5,
          }}
        >
          Add User
        </Button>
      </Stack>

      <Card
        sx={{
          borderRadius: 0.8,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 5px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
          <Stack
  direction="row"
  spacing={0.8}
  sx={{
    mb: 0.8,
    width: "100%",
    overflow: "hidden",
  }}
>
            <TextField
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={inputSx}
            />

            <FormControl size="small" sx={inputSx}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={inputSx}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={genderFilter}
                label="Gender"
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <MenuItem value="all">All Genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={inputSx}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button
              size="small"
              variant="outlined"
              onClick={clearFilters}
              sx={{
                height: 28,
                fontSize: 10,
                fontWeight: 700,
                px: 1.2,
              }}
            >
              Clear
            </Button>
          </Stack>

          <Box sx={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              density="compact"
              rowHeight={31}
              columnHeaderHeight={32}
              pageSizeOptions={[5]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              disableRowSelectionOnClick
              sx={{
                border: "1px solid #e5e7eb",
                fontSize: 11,
                bgcolor: "#fff",
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e5e7eb",
                  py: 0,
                },
                "& .MuiDataGrid-footerContainer": {
                  minHeight: 34,
                  height: 34,
                  fontSize: 11,
                },
                "& .MuiTablePagination-root": {
                  fontSize: 11,
                },
                "& .MuiDataGrid-main": {
    overflow: "hidden",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowX: "hidden",
  },
}}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            width: 520,
            border: "6px solid #c8c18d",
            borderRadius: 0.8,
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 12, fontWeight: 700, py: 0.8 }}>
          {editingId ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent sx={{ px: 1.2, py: 0.5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0.8,
              mt: 0.5,
              "& .MuiInputBase-root": {
                height: 28,
                fontSize: 11,
              },
              "& .MuiInputLabel-root": {
                fontSize: 11,
                top: -4,
              },
              "& .MuiInputLabel-shrink": {
                top: 0,
              },
              "& .MuiFormHelperText-root": {
                fontSize: 9,
                mt: 0,
              },
            }}
          >
            <TextField
              size="small"
              label="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />

            <TextField
              size="small"
              label="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />

            <TextField
              size="small"
              label="Age"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              error={Boolean(errors.age)}
              helperText={errors.age}
            />

            <FormControl size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                value={form.gender}
                label="Gender"
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Contact Number"
              value={form.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              error={Boolean(errors.contactNumber)}
              helperText={errors.contactNumber}
            />

            <TextField
              size="small"
              label="Email Address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <FormControl size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={form.role}
                label="Role"
                onChange={(e) => handleChange("role", e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Username"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <TextField
              size="small"
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                size="small"
                label="Address"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                fullWidth
                multiline
                minRows={2}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 58,
                  },
                }}
              />
            </Box>

            <Box sx={{ gridColumn: "1 / -1" }}>
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: 11,
                  },
                }}
                control={
                  <Switch
                    size="small"
                    checked={form.isActive}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                  />
                }
                label={form.isActive ? "User Status: Active" : "User Status: Inactive"}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 1.2, py: 0.8 }}>
          <Button size="small" onClick={handleClose} sx={{ fontSize: 10 }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleSaveUser}
            sx={{ fontSize: 10, height: 24 }}
          >
            {editingId ? "Save Changes" : "Save User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;