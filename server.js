const express = require("express");
const userRoutes = require("./routes/user");
const revenueRoutes = require("./routes/receitas");

const server = express();

server.use(express.json());
server.use(userRoutes);
server.use(revenueRoutes);

module.exports = server;
