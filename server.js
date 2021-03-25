const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




const db = require("./app/models");
db.sequelize.sync();



const Role = db.role;




//In development, you may need to drop existing tables and re-sync database. Just use force: true
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial(); // Call initial function to create 3 rows in database
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Api Application." });
});


// include routes in server.js
require("./app/routes/books.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/records.routes")(app);
require("./app/routes/payments.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




//initial() function helps us to create 3 rows in database
function initial() {
  Role.create({
    id: 1,
    name: "Librarian"
  });
 
  Role.create({
    id: 2,
    name: "Student"
  });
 
  Role.create({
    id: 3,
    name: "Faculty"
  });
}