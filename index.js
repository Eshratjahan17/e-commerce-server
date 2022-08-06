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
    const productsCollection = client.db("e-commerce").collection("products");
    const airpodsCollection = client.db("e-commerce").collection("airpods");
    //allCatagory APi
    app.get("/allcatagory", async (req, res) => {
      const page=parseInt(req.query.page);
      const size=parseInt(req.query.size);
      console.log(page,size);
      const query={};
      const cursor = productsCollection.find(query);
      console.log(query);
      let products;
      if(page || size){
        products = await cursor.skip(page*size).limit(size).toArray();

      }
      else{
        
         products = await cursor.toArray();

      }
    
      
      res.send(products);
    });
    //airpods Api
    app.get("/airpods", async (req, res) => {
      const q = req.query;
      console.log(q);
      const cursor = airpodsCollection.find(q);
      const result = await cursor.toArray();
      res.send(result);
    });
    //Srearch Api
    app.get("/allcatagory/:key", async (req, res) => {
      let q = { name: { $regex: req.params.key } };
      let cursor = productsCollection.find(q);
      let result = await cursor.toArray();
      res.send(result);
    });
    //Count Api
    app.get('/productCount',async(req,res)=>{
     
      const count = await productsCollection.estimatedDocumentCount();
      res.send({ count });
    })

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
