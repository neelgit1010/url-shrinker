require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const dbUrl =process.env.MONGO_URL
const cookieParser = require('cookie-parser');

//routers
const urlRoute = require('./routers/shortUrls');
const user = require('./routers/user');
const staticRoute = require("./routers/staticRouter");

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbUrl)
.then(() => console.log('mongo db connected'))
.catch(() => console.log('error in db connection'));

const urlSchema = require('./models/shortUrls')
// setting up the view to use the ejs view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false})); // POST form data
app.use(cookieParser());
const { loggedInUsersOnly, checkAuth  } = require('./middlewares/auth');

// Serve static files from the 'public' directory
// app.use(express.static(path.resolve('./public')));
app.set("views", path.resolve("./views"));

// app.get('/', (req, res) => res.send('welcome to url shrinker'));
app.use('/url',loggedInUsersOnly, urlRoute);
app.use('/user' ,user);
app.use("/", checkAuth,staticRoute);   

app.get('/:shortid', async (req, res) => {
    const url = req.params.shortid;
  try {
    const shorturl = await urlSchema.findOne({ shortUrl: url });
    if (shorturl === null) {
      console.log("Short URL not found:", url);
      return res.status(404).send("URL not found");
    }
    
    // console.log("Link clicked and redirected:", shorturl);
    shorturl.clicks++;
    await shorturl.save();

    res.redirect(shorturl.originalUrl);
  } catch (error) {
    console.error("Error handling redirected URL:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => console.log('server started on port : ', port));