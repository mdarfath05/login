const express=require("express")
const app=express() //starts express
const path=require("path")
const hbs= require("hbs")
const collection=require("./mongodb")

const tempelatesPath=path.join(__dirname,'../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.use(express.json())//to connect hbs file and mongodb succesfully connected
app.set("view engine","hbs")//definig our view engine is hbs
app.set("views", tempelatesPath)// default view hataso hame templete me banariso hona view ch rak liye ja naam
app.use(express.static(publicPath))
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.listen(3000,()=>{
    console.log("port connected");
})
 
app.post("/signup",async(req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")

})

app.post("/login",async(req,res)=>{

   try{
    const check=await collection.findOne({name:req.body.name})

    if(check.password===req.body.password)
    {
        res.render("home")
    }
    else{
        res.send("wrong password")
    }
   }
   catch{
      res.send("wrong details")
   }
})
 