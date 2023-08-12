// const express = require("express");
// const { MongoClient } = require("mongodb");
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 9000;
// req ->  what we request/send to server
// res => wat we receive from server
const userList = [
  {
    id: 1,
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: 2,
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: 3,
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: 4,
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: 5,
    label: "Password",
    type: "password",
  },
  {
    id: 6,
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: 7,
    label: "Country",
    type: "text",
    placeholder: "USA",
  },
];

const bookList = [
  {
    id: "1",
    name: "Charlotte's web",
    poster:
      "https://cdn.britannica.com/64/103064-050-295C6879/Charlottes-Web-EB-Garth-Williams.jpg",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/PU2r9tDwZ1M",
    summary:
      "The novel tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte. When Wilbur is in danger of being slaughtered by the farmer, Charlotte writes messages praising Wilbur in her web in order to persuade the farmer to let him live.",
    language: "English",
  },
  {
    id: "2",
    name: "Attitude is everything",
    poster: "https://miro.medium.com/max/1400/1*ItFOYfi8Dyy0yj9n1SE8uQ.jpeg",
    rating: 8.1,
    trailer: "https://www.youtube.com/embed/gqviJoSkf6U",
    summary:
      "Attitude, In psychology, a mental position with regard to a fact or state. Attitudes reflect a tendency to classify objects and events and to react to them with some consistency. Attitudes are not directly observable but rather are inferred from the objective, evaluative responses a person makes.",
    language: "English",
  },
  {
    id: "3",
    name: "The Secret",
    poster: "https://m.media-amazon.com/images/I/81fdQIY6ykL.jpg",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/san61qTwWsU",
    summary:
      "There's no secret to The Secret. The book and movie simply state that your thoughts control the universe. Through this “law of attraction” you “manifest” your desires. “It is exactly like placing an order from a catalogue",
    language: "English",
  },
  {
    id: "4",
    name: "Discover Your Destiny1",
    poster: "https://m.media-amazon.com/images/I/61t18yWH5qL.jpg",
    rating: "10",
    trailer: "https://www.youtube.com/embed/o8wUR2JAeUw",
    summary:
      "'Discover Your Destiny' is a story about enlightenment of Dar Sanderson, who is an incredibly ambitious executive. The book throws light on the fact that 'happiness and harmony can never be achieved and assured by SUCCESS'. Dar is an achiever in almost every aspect of life, yet he is void from the inside.",
    language: "Tamil",
  },
  {
    id: "5",
    name: "The 5 AM Club",
    poster: "https://m.media-amazon.com/images/I/71zytzrg6lL.jpg",
    rating: 8.6,
    trailer: "https://www.youtube.com/embed/Kxvp3eOYphY",
    summary:
      "In The 5 AM Club: Own Your Morning. Elevate Your Life, he uses a fictitious story about a billionaire mentor teaching a struggling artist and an entrepreneur about the importance of waking up early to show how revolutionary it is for success.",
    language: "Hindi",
  },
  {
    id: "6",
    name: "The power is within you",
    poster:
      "https://play-lh.googleusercontent.com/1aghoDaz52K3bbZA3EJGHvEpgaru4uMC3Ud2ik_EAW7SjNLwK7nXxOp_Uad-3L6Ovvg4C2-_d1kqVg=w480-h690-rw",
    rating: 9,
    summary:
      'Louise expands on her philosophy of "loving the self" and shows you how to overcome emotional barriers through learning to listen to your inner voice, loving the child within, letting your true feelings out, and much more!',
    trailer: "https://www.youtube.com/embed/4UzY6ksC6gU",
    language: "Telugu",
  },
  {
    name: "Harry Potter",
    poster:
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/05/Harry-Potter-Movies-in-Order.jpg",
    rating: "10",
    trailer: "trailer 7",
    summary:
      "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter",
    id: "7",
    language: "English",
  },
];

const MONGO_URL = process.env.MONGO_URL;

// console.log(process.env.MONGO_URL);

// "mongodb://127.0.0.1:27017";

//Inbuilt Middleware
//interceptor | converting body to JSON
app.use(express.json());

//mongodb://localhost:27017

//mongodb connection

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
  return client;
}

const client = await createConnection();

//REST API endpoints

app.get("/", (req, res) => {
  res.send("Hello Everyone 🥳🥳🥳");
});

//get all users
app.get("/userList", (req, res) => {
  res.send(userList);
});

//get user by ID
app.get("/userList/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  const user = userList.find((usr) => usr.id == id);
  res.send(user);
});

//books

//Task
// /books => get all books ✅
// /books?language=English => only english books ✅
// /books?language=English&rating=8.8  => filter by language & rating ✅
// /books?rating=8.8  => filter by rating ✅

app.get("/books", async (req, res) => {
  const { language, rating } = req.query;
  console.log(req.query, language);
  // let filteredBook = bookList; //copy by reference
  // if (req.query.language) {
  //   // filteredBook = filteredBook.filter((bk) => bk.language == language);
  //   req.query.language = req.query.language;
  // }
  if (req.query.rating) {
    // filteredBook = filteredBook.filter((bk) => bk.rating == rating);
    req.query.rating = +req.query.rating;
  }
  const book = await client
    .db("b46-we")
    .collection("books")
    .find(req.query)
    .toArray();
  res.send(book);
});

//get book by ID
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  // const book = bookList.find((usr) => usr.id == id);
  // db.books.findOne({ id: "1" });
  const book = await client
    .db("b46-we")
    .collection("books")
    .findOne({ id: id });
  book ? res.send(book) : res.status(404).send({ message: "No Book Found" });
});

//delete book by ID
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await client
    .db("b46-we")
    .collection("books")
    .deleteOne({ id: id });
  res.send(book);
});

//add books
app.post("/books", async (req, res) => {
  const newBooks = req.body;
  console.log(newBooks);
  const result = await client
    .db("b46-we")
    .collection("books")
    .insertMany(newBooks);
  res.send(result);
});

//update books by ID

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBooks = req.body;
  const result = await client
    .db("b46-we")
    .collection("books")
    .updateOne({ id: id }, { $set: updatedBooks });
  res.send(result);
});

app.listen(PORT, () => console.log("Server started on the PORT", PORT));
