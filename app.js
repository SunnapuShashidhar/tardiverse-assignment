require("dotenv").config();
var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodtPaser=require("body-parser")
var User=require("./Routes/User");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(console.log("Connected successfly")).catch((err)=>{console.log(`error occured ${err}`)})
app.use(express.json());
app.use(bodtPaser.json());
app.use("/",User);


const PORT=process.env.PORT||5000
app.listen(PORT,(req,res)=>{
  console.log(`port is running on ${PORT}`)
})