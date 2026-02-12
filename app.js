const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./configuration/db.js");
const port = process.env.PORT || 8080;

const usersRouter = require("./routes/userRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const dishRouter = require("./routes/dishRoutes.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/users", usersRouter); // POST http://localhost:8000/users/register
app.use("/categories", categoryRouter); // POST http://localhost:8000/categories/
app.use("/dish", dishRouter); // POST http://localhost:8000/dishes/
///
app.listen(port, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});


//users
//{
//         "name": "Martynas",
//         "email":"martynas@gmail.com",
//         "password":"123"
//}
// {
//         "name": "Adminname",
//         "email":"Admingmail@gmail.com",
//         "password":"1234"
// } 
