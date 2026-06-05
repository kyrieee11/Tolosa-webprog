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
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";

const emptyForm = {
  slug: "",
  title: "",
  paragraphs: "1",
  preview: "",
  content: "",
  status: "Published",
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

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await fetchArticles();
      setArticles(response.data || []);
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const rows = articles.map((article, index) => ({
    id: article._id,
    displayId: index + 1,
    ...article,
  }));

  const filteredRows = useMemo(() => {
    return rows.filter((article) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        (article.slug || "").toLowerCase().includes(keyword) ||
        (article.title || "").toLowerCase().includes(keyword) ||
        (article.preview || "").toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" || article.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Required";
    if (!form.slug.trim()) newErrors.slug = "Required";
    if (!form.preview.trim()) newErrors.preview = "Required";
    if (!form.content.trim()) newErrors.content = "Required";

    if (!form.paragraphs.trim()) {
      newErrors.paragraphs = "Required";
    } else if (!/^\d+$/.test(form.paragraphs)) {
      newErrors.paragraphs = "Number only";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => {
      if (field === "title" && !editingId) {
        return {
          ...prev,
          title: value,
          slug: generateSlug(value),
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
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

  const handleEditArticle = (row) => {
    setEditingId(row._id);

    setForm({
      slug: row.slug || "",
      title: row.title || "",
      paragraphs: String(row.paragraphs || "1"),
      preview: row.preview || "",
      content: row.content || "",
      status: row.status || "Published",
    });

    setErrors({});
    setOpen(true);
  };

  const handleSaveArticle = async () => {
    if (!validateForm()) return;

    try {
      setPageError("");

      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        paragraphs: Number(form.paragraphs),
        preview: form.preview.trim(),
        content: form.content.trim(),
        status: form.status,
      };

      if (editingId) {
        await updateArticle(editingId, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      handleClose();
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to save article.");
    }
  };

  const handleDeleteArticle = async (row) => {
    const confirmDelete = window.confirm(`Delete article "${row.title}"?`);

    if (!confirmDelete) return;

    try {
      setPageError("");
      await deleteArticle(row._id);
      await loadArticles();
    } catch (error) {
      setPageError(error.response?.data?.message || "Failed to delete article.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const columns = [
    { field: "displayId", headerName: "ID", width: 70 },
    { field: "slug", headerName: "Slug", width: 160 },
    { field: "title", headerName: "Title", width: 220 },
    { field: "paragraphs", headerName: "Paragraphs", width: 110 },
    { field: "preview", headerName: "Preview", width: 360 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            height: 18,
            fontSize: 10,
            fontWeight: 700,
            bgcolor: params.value === "Published" ? "#2e7d32" : "#f8f8f8",
            color: params.value === "Published" ? "#fff" : "#777",
            border: params.value === "Published" ? "none" : "1px solid #cfcfcf",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.6}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditArticle(params.row)}
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
            color="error"
            onClick={() => handleDeleteArticle(params.row)}
            sx={{
              minWidth: 54,
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
          Articles
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
          Add Article
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
              label="Search Articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={inputSx}
            />

            <FormControl size="small" sx={inputSx}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
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
            width: 560,
            border: "6px solid #c8c18d",
            borderRadius: 0.8,
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 12, fontWeight: 700, py: 0.8 }}>
          {editingId ? "Edit Article" : "Add Article"}
        </DialogTitle>

        <DialogContent sx={{ px: 1.2, py: 0.5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0.8,
              mt: 0.5,
              "& .MuiInputBase-root": {
                fontSize: 11,
              },
              "& .MuiInputLabel-root": {
                fontSize: 11,
              },
              "& .MuiFormHelperText-root": {
                fontSize: 9,
                mt: 0,
              },
            }}
          >
            <TextField
              size="small"
              label="Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />

            <TextField
              size="small"
              label="Slug"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              error={Boolean(errors.slug)}
              helperText={errors.slug}
            />

            <TextField
              size="small"
              label="Paragraphs"
              value={form.paragraphs}
              onChange={(e) => handleChange("paragraphs", e.target.value)}
              error={Boolean(errors.paragraphs)}
              helperText={errors.paragraphs}
            />

            <FormControl size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                size="small"
                label="Preview"
                value={form.preview}
                onChange={(e) => handleChange("preview", e.target.value)}
                error={Boolean(errors.preview)}
                helperText={errors.preview}
                fullWidth
                multiline
                minRows={2}
              />
            </Box>

            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                size="small"
                label="Content"
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                error={Boolean(errors.content)}
                helperText={errors.content}
                fullWidth
                multiline
                minRows={4}
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
            onClick={handleSaveArticle}
            sx={{ fontSize: 10, height: 24 }}
          >
            {editingId ? "Save Changes" : "Save Article"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;