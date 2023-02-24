var mongoose=require("mongoose");
var UserSchema=require("../Module/User")
var bcrypt=require("bcrypt");
var jwt=require("jsonwebtoken");

//-----------------sig-up
SignUp=async(req,res)=>{
const {email,password,name}=req.body;
const userdata=await UserSchema.findOne({email});

if(userdata){
  return res.send({status:404,message:"User Already exist..!"})
}

const hashpassword=await bcrypt.hash(password,10);
const user=UserSchema({
  name,
  email,
password:hashpassword
})
user.save((err,responce)=>{
  if(err){
    return res.send({status:400,message:err.message});
  }
  res.status(201).send(responce)
})
}
//----------sign-in
SignIn= async(req,res)=>{
  const {email,password,name}=req.body;
  const user=await UserSchema.findOne({email})
  if(user){
    const pswrd=bcrypt.compare(password,user.password)
    if(pswrd){
      const token=jwt.sign({email,name},process.env.JWT_Sect,{expiresIn:"10min"})
      res.send({status:201,token});
    }else{
      return  res.send({status:404,message:"Invalid password..!"});
    } 
  }else{
    return res.send({status:404,message:"Invalid user..!"})
  } 
}
//----------------get
getUser=(req,res)=>{
    const {email}=req.body;
    const user=UserSchema.findOne({email});
    if(user){
      res.send({status:201,user});
    }else{
      res.send({status:404,message:"user not found"})
    }
}
//---------------check its sign-in or not
requiresSignIn=(req,res,next)=>{
  const token=req.headers["authorization"].split(' ')[1];
//   console.log(req.headers);
  const user=jwt.verify(token,process.env.JWT_Sect,(err,responce)=>{
  if(err){
    return res.send({status:500,message:"Unauthorized token...!"})
  });
  req.user=user;
  next();
}
//----------------update
updateUser=async(req,res)=>{
  const {email,password}=req.body;
  const hash=await bcrypt.hash(password,10)
  const user=UserSchema.updateOne({email},{password:hash});
  if(user){
    res.send({status:201,message:"updated successfully"})
  }else{
    res.send({status:404,message:"user not found"})
  }
}

//--------------deleting a user
deleteUser=(req,res)=>{
  const {email}=req.body;
  const user=UserSchema.deleteOne({email});
  if(user){
    res.send({status:201,message:"deleted successfully"})
  }else{
    res.send({status:404,message:"user not found"})
  }
}
module.exports={SignIn,SignUp,getUser,requiresSignIn,updateUser,deleteUser};


