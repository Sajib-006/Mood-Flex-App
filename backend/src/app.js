const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = socketio(server);

const userRoute = require("./routers/user");
const postRoute = require("./routers/post");

dotenv.config();
require("./db/db");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.get("/api/chat", (req, res) => {
  res.json({
    id: 12345,
  });
});

io.on("connection", (socket) => {
  console.log("a new user connected");

  socket.on("join", ({ name }) => {
    console.log(name);
    socket.join("1234");
  });

  socket.on("message", (message, callback) => {
    console.log(message);
    socket.to("1234").emit("sendMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("server started at port " + port);
});
