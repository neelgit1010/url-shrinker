const { getUser } = require('../services/auth');

function loggedInUsersOnly(req, res, next) {
    // console.log(req);
    const userid = req.cookies?.uid;
    // console.log('Checking user ID from cookies:', userid); // Debugging line

    if (!userid) {
        console.log('No user ID found in cookies, redirecting to /signin');
        return res.redirect('/signin');
    }

    const user = getUser(userid);
    console.log('User found:', user.name, user.email); // Debugging line

    if (!user) {
        console.log('No user found with the given ID, redirecting to /signin');
        return res.redirect('/signin');
    }

    req.user = user;
    console.log('User is authenticated, proceeding to next middleware');
    next();
}

function checkAuth(req, res, next) {
    const userid = req.cookies.uid;
    // console.log('Checking user ID from cookies:', userid); // Debugging line

    const user = getUser(userid);
    console.log('User found:', user); // Debugging line

    req.user = user;
    console.log('User is authenticated, displaying all data');
    next();
}

module.exports = {
    loggedInUsersOnly,
    checkAuth
};
