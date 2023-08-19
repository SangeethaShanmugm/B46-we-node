import express from "express";
import { genPassword, createUser, getUserByName } from "../helper.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  //Validate if username already present
  const isUserExist = await getUserByName(username);
  console.log(isUserExist);
  if (isUserExist) {
    res.status(400).send({ message: "Username already taken" });
    return;
  }
  const hashedPassword = await genPassword(password);
  const result = await createUser(username, hashedPassword);
  res.send(result);
});

export const usersRouter = router;

//Validate if username already present
//Validate if password matches

//store the user details =>   users collection =>username & hashedPassword
