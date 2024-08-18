const express= require("express");
const path = require("path");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.listen(port, () => {
    console.log(`App listening on port no ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());



app.get("/posts", (req,res) => {
    res.render(`index.ejs`, {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    // res.send("reqest working");
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts");
});

app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    posts.push({username, content});
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id/Edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})



let posts = [

    {
        //    id : "1a",
            id:uuidv4(),
            username : "hrutik",
            content : "I love fullstack"
    },
    {
        id:uuidv4(),
        username : "pradeep",
        content : "I love proble java"
    },
   
    {
        id:uuidv4(),
        username : "abhishekh",
        content : "I love flutter"
    },
    {
        id:uuidv4(),
        username : "vijay",
        content : "I love android"
    },
];