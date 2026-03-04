import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  //check whether the database is already connected to save from choking
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    // connecting the dabatase with env url
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Dataabase connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;
