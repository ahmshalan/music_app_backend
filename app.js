// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const feedRoutes = require("./routes/feed");
// const authRoutes = require("./routes/auth");
// const trackRoutes = require("./routes/Track/track");

// const app = express();

// app.use(bodyParser.json()); // application/json

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// app.use("/feed", feedRoutes);

// app.use("/auth", authRoutes);

// app.use("/tracks", trackRoutes);

// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;

//   res.status(status).json({ message: message, data: data });
// });

// mongoose
//   .connect(
//     "mongodb+srv://Ahmshalan:zmq2bjWKCUhs19up@cluster0.bm9ce.mongodb.net/music_app_db?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then((res) => {
//     const db = res.connection;
//     app.listen(8080);
//   })
//   .catch((err) => console.log(err));

/**
 * NPM Module dependencies.
 */
const express = require("express");
const trackRoute = express.Router();
const multer = require("multer");
const Track = require("./models/Track");

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const { createModel } = require("mongoose-gridfs");
/**
 * NodeJS Module dependencies.
 */
const { Readable } = require("stream");

/**
 * Create Express server && Express Router configuration.
 */
const app = express();
app.use("/tracks", trackRoute);

/**
 * Connect Mongo Driver to MongoDB.
 */
let db;
mongoose
  .connect(
    "mongodb+srv://Ahmshalan:zmq2bjWKCUhs19up@cluster0.bm9ce.mongodb.net/music_app_db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    db = res.connection;
    app.listen(8080);
  })
  .catch((err) => console.log(err));

/**
 * GET /tracks/:trackID
 */
trackRoute.get("/:trackID", (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
    });
  }
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: "tracks",
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
});

/**
 * POST /tracks
 */
trackRoute.post("/", (req, res) => {
  // const storage = multer.memoryStorage();
  // const upload = multer({
  //   storage: storage,
  //   limits: { fields: 1, fileSize: 10000000, files: 1, parts: 2 },
  // });
  // upload.single("track")(req, res, (err) => {
  //   if (err) {
  //     return res
  //       .status(400)
  //       .json({ message: "Upload Request Validation Failed" });
  //   } else if (!req.body.name) {
  //     return res.status(400).json({ message: "No track name in request body" });
  //   }

    // let trackName = req.body.name;


    // Covert buffer to Readable Stream
    // const readableTrackStream = new Readable();
    // readableTrackStream.push(req.file.buffer);
    // readableTrackStream.push(null);

    // let bucket = new mongodb.GridFSBucket(db, {
    //   bucketName: "tracks",
    // });

    // let uploadStream = bucket.openUploadStream(trackName);
    // let id = uploadStream.id;
    // readableTrackStream.pipe(uploadStream);
    // Track
    const music = createModel();


    const options = { filename: trackName, contentType: "audio/mp3" };
    music.write(options, readStream, (error, file) => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });

    // new Track(music).save()

    uploadStream.on("error", () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });

});

app.listen(3005, () => {
  console.log("App listening on port 3005!");
});
