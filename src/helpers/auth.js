const helpers ={}

helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
}
module.exports = helpers