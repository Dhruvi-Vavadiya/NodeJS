const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(express.static('public'));


// var options = multer.diskStorage({
//     destination:(req,file,cb) =>{},
//     filename:(req,file,cb) =>{}
// })

var options = multer.diskStorage({
    destination:(req,file,cb) =>{
        if(file.mimetype !== "image/jpeg"){
            return cb("invalid file type")
        }
        cb(null,"./uploads")
    },
    filename:(req,file,cb) =>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
})
var upload = multer ({storage:options});

app.get("/public/file_upload",upload.single("myfile"),function(req,res){
    console.log(upload.storage);
    res.send("File are upload " + req.body.fname + " " + req.body.lname + " " + req.file.path);
});

app.post("/photos_upload",upload.array("photos",2),function(req,res){
    console.log(req.files[0].originalname);
});
app.listen(8000);