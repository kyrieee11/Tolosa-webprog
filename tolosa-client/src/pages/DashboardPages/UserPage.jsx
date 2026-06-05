import { useEffect, useMemo, useState } from "react";
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

import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/UserService";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const emptyForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "male",
  contactNumber: "",
  email: "",
  type: "viewer",
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
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await fetchUsers();
      setUsers(response.data || []);
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const rows = users.map((user, index) => ({
    id: user._id,
    displayId: index + 1,
    fullName: `${user.firstName || ""} ${user.lastName || ""}`,
    ...user,
  }));

  const filteredRows = useMemo(() => {
    return rows.filter((user) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        (user.firstName || "").toLowerCase().includes(keyword) ||
        (user.lastName || "").toLowerCase().includes(keyword) ||
        (user.email || "").toLowerCase().includes(keyword) ||
        (user.username || "").toLowerCase().includes(keyword);

      const matchesRole = roleFilter === "all" || user.type === roleFilter;
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

    if (!editingId && !form.password.trim()) {
      newErrors.password = "Required";
    } else if (form.password.trim() && form.password.length < 8) {
      newErrors.password = "Min 8 chars";
    }

    if (!form.address.trim()) newErrors.address = "Required";

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
    setEditingId(row._id);

    setForm({
      firstName: row.firstName || "",
      lastName: row.lastName || "",
      age: String(row.age || ""),
      gender: row.gender || "male",
      contactNumber: row.contactNumber || "",
      email: row.email || "",
      type: row.type || "viewer",
      username: row.username || "",
      password: "",
      address: row.address || "",
      isActive: Boolean(row.isActive),
    });

    setErrors({});
    setOpen(true);
  };

  const handleSaveUser = async () => {
    if (!validateForm()) return;

    try {
      setPageError("");

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender,
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim(),
        type: form.type,
        username: form.username.trim(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      if (form.password.trim()) {
        payload.password = form.password.trim();
      }

      if (editingId) {
        await updateUser(editingId, payload);
      } else {
        await createUser({
          ...payload,
          password: form.password.trim(),
        });
      }

      await loadUsers();
      handleClose();
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to save user.");
    }
  };

  const handleToggleStatus = async (row) => {
    try {
      setPageError("");

      await updateUser(row._id, {
        isActive: !row.isActive,
      });

      await loadUsers();
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDeleteUser = async (row) => {
    const confirmDelete = window.confirm(
      `Delete ${row.firstName} ${row.lastName}?`
    );

    if (!confirmDelete) return;

    try {
      setPageError("");

      await deleteUser(row._id);
      await loadUsers();
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setGenderFilter("all");
    setStatusFilter("all");
  };

  const columns = [
    { field: "displayId", headerName: "ID", width: 55 },
    { field: "fullName", headerName: "Full Name", width: 170 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "type", headerName: "Role", width: 90 },
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
      width: 210,
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

          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDeleteUser(params.row)}
            sx={{
              minWidth: 50,
              height: 24,
              fontSize: 10,
              fontWeight: 700,
              px: 1,
            }}
          >
            Delete
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
  sx={{
    mb: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }}
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

      {pageError && (
        <Typography
          sx={{
            color: "#dc2626",
            fontSize: 12,
            fontWeight: 600,
            mb: 1,
          }}
        >
          {pageError}
        </Typography>
      )}

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
              loading={loading}
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
                value={form.type}
                label="Role"
                onChange={(e) => handleChange("type", e.target.value)}
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
              label={
                editingId
                  ? "Password - leave blank to keep current"
                  : "Password"
              }
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
                error={Boolean(errors.address)}
                helperText={errors.address}
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
                label={
                  form.isActive
                    ? "User Status: Active"
                    : "User Status: Inactive"
                }
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