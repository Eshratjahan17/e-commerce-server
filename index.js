const express = require("express");
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port =process.env.PORT||5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.18h9d.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
  try{
    await client.connect();
    const productsCollection=client.db("e-commerce").collection("products");
  }
  finally{

  }
  console.log("db connected");
}
run().catch(console.dir);
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("db connected");
//   // perform actions on the collection object
//   // client.close();
// });


app.get("/", (req, res) => {
  res.send("hello after a long time");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
