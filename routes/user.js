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
