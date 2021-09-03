const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;