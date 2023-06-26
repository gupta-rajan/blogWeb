//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://rajan_gupta:Atlas@cluster0.jo6c8jy.mongodb.net/blogDB',{useNewUrlParser: true});

const homeStartingContent = "Welcome to My Life Tapestry! ----------------------- Sharing Life's Journey: Real Stories, Genuine Connections ----------------------- Life Tapestry is a space where I open up and share personal experiences, moments of growth, and life lessons. It's a platform where I invite you to join me on this journey of self-discovery, triumphs, and the occasional stumble. -------------------------- Every experience, no matter how small or seemingly insignificant, has the potential to leave an indelible mark on our lives. Through vulnerability and authenticity, I aim to capture those moments and offer a glimpse into the rollercoaster of emotions, growth, and self-reflection. --------------------------------- Thank you for joining me on this remarkable journey. Together, let's celebrate life, learn from one another, and find inspiration in the stories that shape us. ------------------------------ Let's embark on this adventure together. ----------------------------------- With gratitude, Rajan Gupta.";
const aboutContent = "At Life Tapestry, we believe in the power of storytelling and the beauty of sharing life's experiences. We are a community of individuals who are passionate about embracing vulnerability, celebrating triumphs, and finding connection through the narratives that shape our lives.------------------------------------------- Through the power of authentic storytelling, we aim to create a community that fosters empathy, understanding, and personal growth. Our blog is a place where you'll find a diverse range of narratives—real and raw—spanning topics such as life lessons, travel adventures, career transitions, relationships, personal growth, and much more.";
const contactContent = "We'd love to hear from you! If you have any questions, feedback, or simply want to connect, please don't hesitate to reach out to us. We value your thoughts and appreciate your engagement with our blog.-------------------------------------- Address: IIT Dharwad WALMI Campus, NH4, Next to Dharwad High Court, Dharwad 580011. -------------------------------------  Thank you for visiting Life Tapestry. We look forward to connecting with you and continuing this incredible journey together.";

const app = express();

// const post = [];

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post",postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Post.find().then(function(posts){
    res.render("home",{homeText: homeStartingContent, allPosts: posts});
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{contactText: contactContent});
})

app.get("/about",function(req,res){
  res.render("about",{aboutText: aboutContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/posts/:postId",function(req,res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId}).then(function(post){
    res.render("post",{title:post.title, content: post.content});
  });
});

app.post("/compose",function(req,res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save().then(function(){
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});