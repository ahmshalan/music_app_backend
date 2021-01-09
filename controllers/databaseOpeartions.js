// Function to reterive from server
exports.reterive = async (req, res) => {
  // Define the username and api key of the database
  serviceHostname = "9b2029d5-92fc-48af-bb8e-62afd1544e91-bluemix";
  servicePassword = "_9i_HFORI7kp3-T3oqvLYDQONJ4sdIhBd4QLZm5LDom0";

  const Cloudant = require("@cloudant/cloudant");
  console.log("Logged");
  console.log(req.body);

  var cloudant = new Cloudant({
    account: serviceHostname,
    plugins: {
      iamauth: {
        iamApiKey: servicePassword,
      },
    },
  });

  if (req.param.method === "all" || req.param.method === null) {
    doc = {
      selector: {
        _id: {
          $gt: "0",
        },
      },
    };
  } else {
    doc = {
      selector: { name: "song 1" },
    };
  }
  // select the table of songs
  const db = cloudant.db.use("songsinfo");
  // To reterive
  try {
    const response = await db.find(doc);
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};

// Function to insert to cloudant
exports.insert = async (req, res) => {
  // Define the username and api key of the database
  serviceHostname = "9b2029d5-92fc-48af-bb8e-62afd1544e91-bluemix";
  servicePassword = "_9i_HFORI7kp3-T3oqvLYDQONJ4sdIhBd4QLZm5LDom0";

  const Cloudant = require("@cloudant/cloudant");

  var cloudant = new Cloudant({
    account: serviceHostname,
    plugins: {
      iamauth: {
        iamApiKey: servicePassword,
      },
    },
  });

  // select the table of songs
  const db = cloudant.db.use("songsinfo");
  // To reterive
  try {
    const enter = {
      name: "FormNum",
      artist: "The problem",
    };
    const insertor = await db.insert(enter);
    res.send(JSON.stringify(insertor) + "Is created successufly");
  } catch (err) {
    console.log(err);
  }
};
