require("dotenv").config();
require("./dbConfig");

const express = require("express");

const cors = require("cors"); // cross origin resource sharing

const router = require("./router");

const server = new express();

const PORT = process.env.PORT;

server.use(cors());

server.use(express.json()); //middlware such as parsing

server.use('/uploads',express.static('./uploads'))

server.use(router);     

// server.get('/',(req,res)=>{
//   res.send('haii')
// })

server.listen(PORT, () => {
  console.log(PORT, "server running");
});
