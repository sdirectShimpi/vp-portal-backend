exports.fileUpload = async (file, pathLocation) => {
    let result;
    const pathFile = `./upload/${pathLocation}/`;
    if (!fs.existsSync(pathFile)) {
        fs.mkdirSync(pathFile, { recursive: true });
    }
    let fileName = file.name;
    const maxfilesize = 20971520; //10MB
    let allowedExtensions = /(\.jpg)$/i;
    allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.doc|\.docx)$/i;
    if (!allowedExtensions.exec(fileName)) {
        result = "invalidFileType";
    } else if (file.size > maxfilesize) {
        result = "fileSizeTooHigh";
    } else {
        fileName = fileName.replace(/\s+/g, "-").toLowerCase();
        fileName =
            Date.now() + generateRandom(6, true) + "-" + fileName;
        const path = pathFile + fileName;    "./upload/admin/2023-09-06123ABC-rohit.jpg"
        const dbPath = `/${pathLocation}/${fileName}`;  "/admin/2023-09-06123ABC-rohit.jpg"
        await file.mv(path);
        result = dbPath;
    }
    return result;
};
