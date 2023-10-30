const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("./models/Place");

const BookingModel = require("./models/Booking");

require("dotenv").config();
const app = express();
const jwtSecret = "sytsywweyyt";
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userDoc = await User.create({ name, email, password: hashPassword });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (isMatch) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;

          res.cookie("token", token).json(userDoc);
          // console.log("Token set:", token);
        }
      );
    } else {
      res.status(422).json("password not match");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }

  res.json(uploadedFiles);
});

app.post("/places", async(req, res) => {
  const { token } = req.cookies;
  // console.log(token);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
   const placeDoc = await PlaceModel.create({
     owner: userData.id,
     title,
     address,
     photos: addedPhotos,
     description,
     perks,
     extraInfo,
     checkIn,
     checkOut,
     maxGuests,
     price,
   });
    res.json(placeDoc)
});
});

app.get('/user-places',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret , {} , async (err , userData)=>{
    const {id} = userData;
    res.json(await PlaceModel.find({owner:id}));
  });
});

app.get('/places/:id' , async(req,res)=>{
  const {id} = req.params;
  
  res.json(await PlaceModel.findById(id));
})


app.put('/places' , async(req,res)=>{
  const {token} = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,price
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
  const placeDoc = await PlaceModel.findById(id);
  
  if(userData.id === placeDoc.owner.toString()){
    placeDoc.set({
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    await placeDoc.save();
    res.json('ok');
  }

  });
});

app.get('/places' , async(req,res)=>{
  res.json(await PlaceModel.find());
})

app.post('/bookings', async(req,res)=>{
const userData = await getUserDataFromToken(req);
  const {
    place,checkIn,checkOut,numberOfGuests,name,phone,price
  } = req.body;
    BookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user:userData.id,
    }).then((doc)=>{
      res.json(doc);
    }).catch((err)=>{
      throw err;
    }) ;

});




app.get('/bookings',async (req,res)=>{
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({user:userData.id}).populate('place'));
});

app.listen(4000, () => {
  console.log("server is started on port", 4000);
});
