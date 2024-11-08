const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log("Connected with mongo");
  } catch (err) {
    console.log("Error Connecting with mongo:-", err);
  }
};

module.exports = db;
