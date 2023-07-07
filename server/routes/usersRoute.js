const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlwares/authMiddleware");

//new user registration
router.post("/register", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User exist");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hachedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hachedPassword;
    //save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user login
router.post("/login",async(req,res)=>{
    try {
        //check if user exists
        const user=await User.findOne({email:req.body.email});
        if (!user){
            throw new Error("User not found");
        }
        //if user is blocked or not 
        if (user.status!== "active") {
          throw new Error ("the user account is blocked")
        }
        //comparing password
        const validpassword =await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validpassword){
            throw new Error ("invalid password");
        }
        //create token 
        const token =jwt.sign ({userId:user._id},process.env.jwt_secret,{expiresIn : "1d"});
        //send response
        res.send({
            success:true,
            message:"User logged in successfully",
            data:token
        });
        
    } catch (error) {
        res.send({
            success:false,
            message:error.message, 
        })
    }
})
// get current user
router.get("/get-current-user", authMiddleware,  async(req,res) =>{
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message : "User fetched successfully",
      data : user,
    });
    
  } catch (error) {
    res.send({
      success:false,
      message: error.message,
    })
    
  }
})

// get all users
router.get("/get-users",authMiddleware, async(req,res) => {
  try {
    const users = await User.find();
    res.send({
      success: true ,
      message: "Users fetched successfully",
      data: users,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    
  }
})


// update user status

router.put("/update-user-status/:id",authMiddleware, async(req,res) => {
  try{
    await User.findByIdAndUpdate(req.params.id, req.body);
  res.send({
    success: true,
    message: "user status updated successfully",
  })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,

    });
  }});


module.exports = router;