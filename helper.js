import { client } from "./index.js";

export async function getAllBooks(req) {
  return await client
    .db("b46-we")
    .collection("books")
    .find(req.query)
    .toArray();
}
export async function getBooksByID(id) {
  return await client.db("b46-we").collection("books").findOne({ id: id });
}
export async function deleteBookByID(id) {
  return await client.db("b46-we").collection("books").deleteOne({ id: id });
}
export async function addBooks(newBooks) {
  return await client.db("b46-we").collection("books").insertMany(newBooks);
}
export async function updateBooksByID(id, updatedBooks) {
  return await client
    .db("b46-we")
    .collection("books")
    .updateOne({ id: id }, { $set: updatedBooks });
}

//movies

export async function getAllMovies(req) {
  return await client.db("IMDB-movies").collection("movies").find({}).toArray();
}
