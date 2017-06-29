/**
 * This is a middleware to protect some routes.
 */
exports.auth = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user is available for use here
        console.log('Code @ /middleware/auth.js ensureAuthenticated： welcome.');
        next();
    } else {
        // denied. redirect to login
        console.log('ensureAuthenticated： You are not login.');
        res.redirect('/signin');
    }
}