import express from "express";
import { getAllMovies } from "../helper.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await getAllMovies(req);
  res.send(movies);
});

export const moviesRouter = router;
