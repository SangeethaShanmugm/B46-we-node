// show dbs  -> list all dbs
// use dbName -> creating & switching to db
//db -  current db

db.dashboard.insertMany([
  {
    id: 1,
    username: "Sakthi",
    img: "https://images.exels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "@gmail.com",
    age: 26,
  },
  {
    id: 2,
    username: "vel",
    img: "https://images.pexels.com/photos/120770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 3,
    username: "vijay",
    img: "https",
    email: "@gmail.com",
    status: "pending",
    age: 20,
  },
  {
    id: 4,
    username: "Jai",
    img: "https",
    email: "@gmail.com",
    status: "active",
    age: 26,
  },
  {
    id: 5,
    username: "jay",
    img: "https",
    email: "@gmail.com",
    status: "passive",
    age: 27,
  },
  {
    id: 6,
    username: "arun",
    img: "https",
    email: "w@gmail.com",
    status: "active",
    age: 25,
  },
]);

db.dashboard.find().pretty();

//age < 21
db.dashboard.find({ age: { $lt: 21 } }).pretty();

//age >=25
db.dashboard.find({ age: { $gte: 25 } }).pretty();

//projection

//inclusion = 1

db.dashboard.find({}, { username: 1, status: 1 }).pretty();

//exclusion - 0

db.dashboard.find({}, { username: 0, status: 0 }).pretty();

//inclusion + exclusion => ❌
db.dashboard.find({}, { username: 0, status: 1 }).pretty();

//ignore _id
db.dashboard.find({}, { _id: 0, username: 1, status: 1 }).pretty();

//sorting

//asc = 1
db.dashboard.find().sort({ age: 1 }).pretty();

//desc = -1

db.dashboard.find().sort({ age: -1 }).pretty();

//limit
db.dashboard.find().sort({ age: -1 }).limit(2).pretty();

//skip

db.dashboard.find().sort({ age: -1 }).limit(2).skip(2).pretty();

//exclusion of _id and inclusion of username, email,age

db.dashboard.find({}, { _id: 0, username: 1, email: 1, age: 1 }).pretty();

//exclusion of _id and inclusion of username, email,age and sort by username

db.dashboard
  .find({}, { _id: 0, username: 1, email: 1, age: 1 })
  .sort({ username: 1 })
  .pretty();

//exclusion of _id and inclusion of username, email,age and sort by username, limit and skip by 3
db.dashboard
  .find({}, { _id: 0, username: 1, email: 1, age: 1 })
  .sort({ username: 1 })
  .limit(3)
  .skip(3)
  .pretty();

//aggregate

db.orders.insertMany([
  { _id: 0, productName: "Steel Beam", status: "new", quantity: 10 },
  { _id: 1, productName: "Steel Beam", status: "urgent", quantity: 20 },
  { _id: 2, productName: "Steel Beam", status: "urgent", quantity: 30 },
  { _id: 3, productName: "Iron Rod", status: "new", quantity: 15 },
  { _id: 4, productName: "Iron Rod", status: "urgent", quantity: 50 },
  { _id: 5, productName: "Iron Rod", status: "urgent", quantity: 10 },
]);

db.orders.find({}).pretty();

//select sum(quantity) from orders where status="urgent"
//group by productName

//Stage -1
// $match -> status = "urgent"

db.orders.aggregate([{ $match: { status: "urgent" } }]);

//Stage -2
// $group -productName, accumulator - $sum -> quantity

db.orders.aggregate([
  { $match: { status: "urgent" } },
  {
    $group: { _id: "$productName", totalUrgentQuantity: { $sum: "$quantity" } },
  },
]);

db.orders.aggregate([
  { $match: { status: "urgent" } },
  {
    $group: {
      productname: "$productName",
      totalUrgentQuantity: { $sum: "$quantity" },
    },
  },
]);

//Task
//1. update the language for all documents -  English
//2. update the username from Jay to Peter
//3. update correct email id for all documents
// 4. delete all users with rating below 23
