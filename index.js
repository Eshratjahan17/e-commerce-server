const express = require("express");
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port =process.env.PORT||5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.18h9d.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
  try{
    await client.connect();
    const productsCollection=client.db("e-commerce").collection("products");
    const airpodsCollection=client.db("e-commerce").collection("airpods");
    //allCatagory
app.get("/allcatagory", async (req, res) => {
  const q = req.query;
  console.log(q);
  const cursor = productsCollection.find(q);
  const result = await cursor.toArray();
  res.send(result);
});
    //allCatagory
app.get("/airpods", async (req, res) => {
  const q = req.query;
  console.log(q);
  const cursor = airpodsCollection.find(q);
  const result = await cursor.toArray();
  res.send(result);
});

  }
  finally{

  }
  console.log("db connected");
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("hello after a long time");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
