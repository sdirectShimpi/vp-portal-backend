/*
 * @file: index.js
 * @description: It contain server setup function.
 * @author: shimpi kumari
 */
const express = require("express");
const app = express();
const config = require("config");
const { port } = config.get("app");

// port = "3030"
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sDirect";
const http = require("http");


const userRouter = require("./router/user-router");
const path = require("path");

const fileUpload = require("express-fileupload");
const fs = require("fs");
const resumeRouter = require("./router/resume-router");
const productRouter = require("./router/project-router");
const projectPlanRouter = require("./router/projectPlan-router");
const RoleRouter = require("./router/role.router");
const leaveRole = require("./router/leave-router");
const taskRole = require("./router/task-router");
const roomRouter = require("./router/room-router")
const DSRRouter = require("./router/dsr-router")
const cors = require("cors");

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});


try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use("/upload", express.static("upload"));
  app.use(express.static(path.join(__dirname, "../upload")));
  // io.on('connection', (socket) => {
  //   console.log('A user connected');
  
  
  //   socket.on('disconnect', () => {
  //     console.log('A user disconnected');
  //   });
  // });






  io.on('connection', (socket) => {
    console.log("user connected", socket.id)
    socket.on("join-room", (data) => {
        socket.join(data.room)
        console.log(data.userName + "joined" + data.room + "room")
    })
    
    socket.on("send-message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive-msg", data)
    })
})
  

  mongoose
    .connect(url)
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
      console.error(err);
    });
  app.use(cors());
  app.use("/api/v1", leaveRole);
  app.use("/api/v1", resumeRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", productRouter);
  app.use("/api/v1", projectPlanRouter);
  app.use("/api/v1", RoleRouter);
  app.use("/api/v1", taskRole);
  app.use("/api/v1", roomRouter);
  app.use('/api/v1',DSRRouter)


  server.listen(port, () => {
    console.log(`Server is listening on port -- ${port}`);
  });
} catch (err) {
  console.log("error in index.js", err);
}
