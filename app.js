//SSR

//CSR
// console.log('Hello, World!');
const express = require('express');
const fs = require('fs')
const {check,validationResult} = require('express-validator'); //for validation


const app=express()
app.use(express.urlencoded());
app.set("view engine","ejs")
//this use if folder name are not finding (server level configration)
// app.set("views","./view-dir")
 app.use(express.static("./static"))

const product_router = require('./routes/product'); //router middleware
app.use('/product', product_router);

app.get('/form1', (req, res) => {
  res.render("form1",{formData:[]});
});
//check funaction is doing sanitazation and validation
app.post('/form1',
 [ check("fname").trim().escape().notEmpty().withMessage("Enter first name"),
  check("lname").trim().escape().notEmpty().withMessage("Enter last name")]
  , (req, res) => {
    const errs = validationResult(req);
    console.log(errs);
    if(!errs.isEmpty()){
      // return res.render("form1",{FormData:req.body,errors:errs.array()});
      return res.render("form1",{errors:errs.array(),formData:req.body});
      console.log("error in validation");
    }
  res.send(req.body.fname + " " + req.body.lname);
});
// app.get('/register', (req, res) => {
// });

//data ejs EJS = (SSR)Server Side Rendering
//CJS =call API use AJAX,javascript is (CSR)Client Side Rending
app.get("/data",(req,res)=>{
  var v1 = "str"
  var n1 =10

  res.render("data",{
    var1:v1,
    num1:n1,
    a1:[12,547,88,475,47],
    stud1:{rno:1,name:"st1"},
    studens:[
      {rno:1,name:"dhruvi"},
      {rno:2,name:"janvi"},
      {rno:3,name:"nency"}
    ]
  });
});

// app.use('/',(req,res,next)=>{ //application middleware
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });

app.get('/page2',function(req,res,next){
  fs.readFile("./filename.txt","utf-8",(err,data)=>{
    if(err){
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  })
})

app.get('/page1', (req, res) => {
  res.send('Hello, World!');
});
app.get('/getdata', (req, res) => {
  res.send('Hello, World!');
});
app.listen(8000);
// app.listen(8000, () => {
//   console.log(`Server is running at http://localhost:8000`);
// }); 
  
