const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch articles",
    });
  }
};

const createArticle = async (req, res) => {
  try {
    const { slug, title, paragraphs, preview, content, status } = req.body;

    if (!slug || !title || !preview || !content) {
      return res.status(400).json({
        message: "Slug, title, preview, and content are required",
      });
    }

    const existingSlug = await Article.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (existingSlug) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    const article = await Article.create({
      slug: slug.toLowerCase().trim(),
      title,
      paragraphs: paragraphs || 1,
      preview,
      content,
      status: status || "Published",
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create article",
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to update article",
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to delete article",
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};