const express = require("express");

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello Nabil!");
});

app.get("/user", (req, res) => {
  res.send("Ten Users are waithing for me! 😁");
});

app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
