const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(express.json());

const uri =
  "mongodb+srv://SimpleCURD:faKZCIpp9VzxmxLb@cluster0.iwogmq8.mongodb.net/?appName=Cluster0";

const port = 8000;

const users = [
  {
    id: "u_001",
    name: "Jordan Smith",
    username: "jsmith_99",
    location: "Chicago, IL",
    bio: "Full-stack developer and coffee enthusiast.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
  {
    id: "u_002",
    name: "Amara Okafor",
    username: "amara_codes",
    location: "Lagos, Nigeria",
    bio: "UX Researcher focused on accessibility.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
  },
  {
    id: "u_003",
    name: "Hiroshi Tanaka",
    username: "h_tanaka",
    location: "Tokyo, Japan",
    bio: "Data Scientist and amateur marathon runner.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
  },
];

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    const database = client.db("SimpleCURD");
    const usercollection = database.collection("CRUD");

    app.get("/users", async (req, res) => {
      const cursor = usercollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {
        _id: new ObjectId(id),
      };
      const user = await usercollection.findOne(query);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usercollection.insertOne(newUser);
      res.send(result);
    });

    // Inside run() function
    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id; // No await needed
      const updateInfo = req.body; // No await needed

      const filter = { _id: new ObjectId(id) };

      const updatedDocument = {
        $set: {
          name: updateInfo.name,
          email: updateInfo.email,
          phone: updateInfo.phone, // Added these
          company: updateInfo.company, // Added these
          message: updateInfo.message, // Added these
        },
      };

      const result = await usercollection.updateOne(filter, updatedDocument);
      res.send(result); // Sends { acknowledged: true, modifiedCount: 1 }
    });


    

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await usercollection.deleteOne(query);
      res.send(result);
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Nabil!");
});

app.get("/user", (req, res) => {
  res.send("Ten Users are waithing for me! 😁");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log("Post method is working", req.body);

  const newUser = req.body;
  users.id = users.length + 1;
  users.push(newUser);

  res.send({ message: "User Created Successfully" });
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
