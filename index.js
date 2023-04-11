// importing our express package
// import React {useSuspend} from 'react'

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

// importing a file
const expenseScheme = require("./Model/expenseSchema");

// Model takes in the name and the structure
const expenseModel = mongoose.model("Expense", expenseScheme);
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
// Access key
const mongoDBAccess =
  "mongodb+srv://admin:135879mern@expensemongodbclass.bjbfkes.mongodb.net/?retryWrites=true&w=majority";

// To connect to Mongo DB, You need to pass in the access key and a new default Object from Mongo DB
mongoose
  .connect(mongoDBAccess, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// const exportData = {
//     name: 'Transportation',
//     amount: 700,
//     date: 'april 1st',
//     invoice: 'payment for transport'
// }

// expense is coming from model
// const addExpense = new expenseModel(exportData)

// addExpense.save()

// calling the app variable where we stored the epress

// listening to a port takes in 2 parameters, a value and a function
const port = 5000;
app.listen(port, () => {
  console.log("Listened to port" + "" + port);
});

// sending Data when the route is correct
// First endpoint
// Name and Function parameters
app.get("/", (req, res) => {
  res.send("hello and welcome to expense server");
});

app.get("/greetings", (req, res) => {
  res.send("nodemon is working fine");
});

// GET Expense API Endpoint
app.get("/expenses", async (req, res) => {
  let data = await expenseModel.find();
  res.send(data);
});

// POST expense API Endpoint
app.post("/addExpense", async (req, res) => {
  let addNewExpense = {
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date,
    invoice: req.body.invoice,
  };
  let saveNewExpense = new expenseModel(addNewExpense);
  let data = await saveNewExpense.save();
  res.send(data);
});


// Put and Patch expenses by ID

app.put('/expenses/:id', async (req, res) => {
  const id = req.params.id
  const addNewExpense = {
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date,
    invoice: req.body.invoice,
  };

  const data = await expenseModel.findByIdAndUpdate(id,{$set: addNewExpense}, {new: true})
  res.send(data)
})


// Delete API 

app.delete('/expenses/:id', async(req, res) => {
  const id = req.params.id
  const data = await expenseModel.findByIdAndDelete(id)

  res.send(data)
})

// get by ID endpoint

app.get('expenses/:id', async(req, res) => {
  const id = req.params.id

  let data = await expenseModel.findById(id)

  res.send(data)
})