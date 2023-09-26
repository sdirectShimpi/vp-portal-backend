const fs = require("fs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { jwtKey, jwtAlgo } = config.get("app");

const generateToken = (data) =>
  jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: "1d" });

const fileUpload = async (file, pathLocation) => {
//   console.log("file ", file)
//   console.log("path location", pathLocation)
//   return;
  let result;
  const pathFile = `./upload/${pathLocation}/`;
//   console.log("path file", pathFile)
//   return;
  if (!fs.existsSync(pathFile)) {
    fs.mkdirSync(pathFile, { recursive: true });
  }
  let fileName = file.name;
  const maxfilesize = 20971520; //10MB
  let allowedExtensions = /(\.jpg)$/i;
  allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.doc|\.docs)$/i;
  if (!allowedExtensions.exec(fileName)) {
    result = "invalidFileType";
  } else if (file.size > maxfilesize) {
    result = "fileSizeTooHigh";
  } else {
    // console.log("file name", fileName)
    // return;
 
    fileName = fileName.replace(/\s+/g, "-").toLowerCase();
    fileName = Date.now() + "-" + fileName;
    const path = pathFile + fileName;
    // console.log("path", path)
    // return;
    const dbPath = `/${pathLocation}/${fileName}`;
    //  console.log("dbPath", dbPath)
    // return;
    await file.mv(path);
    result = dbPath;
    //  console.log("result", result)
    // return;
  }
  return result;
};

module.exports = { fileUpload, generateToken };
