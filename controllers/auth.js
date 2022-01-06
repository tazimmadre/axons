const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res, next) => {
  try {
    if (!req.userId) {
      res.send("User Not Found");
    }
    let { page, limit } = req.query;
    page = page * 1;
    limit = limit * 1;
    let limitVal = limit;
    let skipValue = (page - 1) * limitVal;
    const users = await User.find()
      .limit(limit)
      .skip(skipValue)
      .select("-password");
    res
      .status(200)
      .send({ status: "Success", id: new Date().toISOString(), users: users });
  } catch (err) {
    res.send({ error: err });
  }
};
exports.getByDetails=async(req,res)=>{
  let { page, limit } = req.query;
  page = page * 1;
  limit = limit * 1;
  let limitVal = limit;
  let skipeValue = (page - 1) * limitVal;
  const {key,term}=req.body;
  try {
    if (key === "firstName") {
      const data = await User.find({
        firstName: { $regex: term, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .select("-password")
        .limit(limitVal)
        .skip(skipeValue);
      return res
        .status(200)
        .json({
          message: "Success",
          SearchResults: data,
          totalRecords: data.length,
        });
    } else if (key === "lastName") {
      const data = await User.find({
        lastName: { $regex: term, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(limitVal)
        .select("-password")
        .skip(skipeValue);
      return res
        .status(200)
        .json({
          message: "Success",
          SearchResults: data,
          totalRecords: data.length,
        });
    }else if (key === "mobileNo") {
      const data = await User.find({
        mobileNo: { $regex: term, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .select("-password")
        .limit(limitVal)
        .skip(skipeValue);
      return res
        .status(200)
        .json({
          message: "Success",
          SearchResults: data,
          totalRecords: data.length,
        });
    }else if (key === "email") {
      const data = await User.find({
        email: { $regex: term, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .select("-password")
        .limit(limitVal)
        .skip(skipeValue);
      return res
        .status(200)
        .json({
          message: "Success",
          SearchResults: data,
          totalRecords: data.length,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error });
  }

}
exports.updateUser = async (req, res, next) => {
  try {
    if (!req.userId) {
      res.send("User Not Found");
    }
    const id= req.params.id;
    const {address,mobileNo,firstName,lastName}= req.body;
    const user = await User.findByIdAndUpdate(id,{address:address,mobileNo:mobileNo,firstName:firstName,lastName:lastName},{new:true}).select("-password");
    res
      .status(200)
      .send({ status: "Success", id: new Date().toISOString(), updateduser: user });
  } catch (err) {
    res.send({ error: err });
  }
};
exports.postSignup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, mobileNo, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      address: address,
      mobileNo: mobileNo,
    });

    res.status(201).json({
      message: "Signup Successful User Created",
      post: {
        id: new Date().toISOString(),
        Email: email,
        userId: user._id,
      },
    });
  } catch (err) {
         res.status(400).send({ Error: err });
  }
};

exports.postSignin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    const user = await User.findOne({ email: email });
    if (!user) {
          res
            .status(400)
            .send({ error: "A user with this Email could not be found" });

    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
     res.status(400).send({Error:"Wrong Password"});
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretcode"
    );
    res.status(200).json({
      token: token,
      message: "Login Sucessful! Welcome to our Page",
      post: { id: new Date().toISOString, Email: email },
    });
  } catch (err) {
         res.status(400).send({ Error: err });

  }
};
