/*
 * @file: index.js
 * @description: It contain server setup function.
 * @author: shimpi kumari
 */
const express = require('express')
const app = express()
const config = require('config')
const { port } = config.get("app")

// port = "3030"
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/sDirect"
const http = require('http')
const userRouter = require('./router/user-router')
const path = require("path");

const fileUpload = require("express-fileupload")
const fs = require('fs');
const  resumeRouter = require('./router/resume-router')
const productRouter = require('./router/project-router')
const projectPlanRouter = require('./router/projectPlan-router')
const RoleRouter = require('./router/role.router')
const leaveRole = require('./router/leave-router')
const taskRole = require('./router/task-router')
const cors = require('cors')



try{
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload());
app.use("/upload", express.static("upload"));
app.use(express.static(path.join(__dirname, "../upload")));




mongoose.connect(url).then(() => console.log("DB Connection Successfull"))
.catch((err) => {
  console.error(err);
});
app.use(cors())
app.use('/api/v1', leaveRole)
app.use('/api/v1', resumeRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',productRouter)
app.use('/api/v1',projectPlanRouter)
app.use('/api/v1',RoleRouter)
app.use('/api/v1',taskRole)

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port -- ${port}`)
})

} catch(err){
console.log('error in index.js',err)
}






