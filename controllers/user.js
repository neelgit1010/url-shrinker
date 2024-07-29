const user = require("../models/user");

const { v4: uuid } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    await user.create({
      name,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    console.log("Error while signing up\n", error);
    res.status(409).send("Error in signup, duplicate entry found");
  }
}
async function handleUserSignIn(req, res) {
  try {
    const { email, password } = req.body;
    const person = await user.findOne({ email, password });

    if (!person) res.send("Invalid username or password");
    // else console.log('person found : ', person);

    // if everything is okay then create a session ID for every new user
    const sessionId = uuid();
    // console.log(sessionId);
    setUser(sessionId, person);
    // // const token = setUser(person);
    // // cookie created, check browser's appplication in dev panel
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    console.log("User not found, ", error);
  }
}

function handleUserLogout(req, res) {
  console.log("cookie cleared");
  res.clearCookie("uid").redirect("/signin");
}

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
  handleUserLogout,
};
