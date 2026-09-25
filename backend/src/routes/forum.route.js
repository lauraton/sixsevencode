import { Router } from "express";
import { createPost, getPosts, addComment, likePost } from "../controllers/forum.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // 👈 Nombre correcto

export const forumRouter = Router();

forumRouter.get("/api/forum/posts", authMiddleware, getPosts);
forumRouter.post("/api/forum/posts", authMiddleware, createPost);
forumRouter.post("/api/forum/posts/:postId/comments", authMiddleware, addComment);
forumRouter.post("/api/forum/posts/:postId/like", authMiddleware, likePost);