var router=require("express").Router();
var {SignIn,SignUp,getUser,requiresSignIn,deleteUser,updateUser}=require("../Controles/User")

router.post("/sign-up",SignUp);
router.post("/sign-in",SignIn);
//curd operations
// router.get("/user",requiresSignIn,getUser)
// router.put("/update",requiresSignIn,updateUser);
// router.delete("/delete",requiresSignIn,deleteUser)
router.get("/user",getUser)
router.put("/update",updateUser);
router.delete("/delete",deleteUser)
module.exports=router;