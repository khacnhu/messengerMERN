const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const { PromiseProvider } = require("mongoose");

module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };


module.exports.login = async (req, res, next)=>{
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) {
      return res.json({msg: "Tên đăng nhập của bạn không tìm thấy", status: false});
    }
    
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword){
       return res.json({msg: "Mật khẩu của bạn nhập không đúng", status: false})
      }
    delete user.password;
    return res.json({status: true, user});
  
  } catch (error) {
    next(error)
  }

}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};


module.exports.getAllUsers = async (req, res, next) =>{
  try {
    const users = await User.find({_id: {$ne: req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ]);
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

// module.exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };


  