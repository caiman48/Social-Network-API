const mongoose = require("mongoose");
const { User, Thought } = require("./models");
const { userData, thoughtData } = require("./data");

mongoose
  .connect("your-mongodb-connection-string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
    return User.deleteMany({});
  })
  .then(() => {
    return Thought.deleteMany({});
  })
  .then(() => {
    return User.create(userData);
  })
  .then(() => {
    return Thought.create(thoughtData);
  })
  .then(() => {
    console.log("Database seeded!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Failed to seed database:", err);
    mongoose.disconnect();
  });
