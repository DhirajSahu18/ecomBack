const mongoose = require("mongoose");

const Connection = async () => {
  const MongoURI =
    "mongodb+srv://admin:admin@cluster0.3apuxzg.mongodb.net/Ecom";

  try {
    await mongoose.connect(MongoURI);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Mongoose Connection error", error?.message);
  }
};

module.exports = Connection