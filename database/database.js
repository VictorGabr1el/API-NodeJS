import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/users")
  .then(console.log("Mongoose conectado"))
  .catch((err) => {
    return console.log(err);
  });

export default mongoose;
