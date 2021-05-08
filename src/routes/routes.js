const routes = require('express').Router();
const passport = require('passport')

const {  get_operations,get_operations_type, post_operation, put_operation, delete_operation, get_operations_category } = require('../controllers/operations.js')

routes.get('/api/operations', get_operations)
routes.get('/api/operations/category/:category',get_operations_category )
routes.get('/api/operations/type/:type',get_operations_type )

routes.post('/api/post-operation', post_operation);
routes.put('/api/put-operation/:id', put_operation);
routes.delete('/api/delete-operation/:id', delete_operation);

const { post_signup, post_login, get_logout} = require('../controllers/users.js')

routes.get('/api/logout', get_logout);
 routes.post('/api/signup', post_signup);

 routes.post('/api/login', passport.authenticate('local',{
    successRedirect: 'http://localhost:3001/operations',
    failureRedirect:'/signup'
})); 

module.exports = routes;