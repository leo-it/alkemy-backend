const routes = require('express').Router();
const {verifyToken} = require('../controllers/verify.controller')

const {  get_operations,get_operations_type, post_operation,update_Status_Operation, put_operation, delete_operation, get_operations_category } = require('../controllers/operations.js')

routes.get('/api/operations', verifyToken, get_operations)
routes.get('/api/operations/category/:category', verifyToken, get_operations_category )
routes.get('/api/operations/type/:type', verifyToken,  get_operations_type )

routes.post('/api/post-operation', verifyToken, post_operation);
routes.put('/api/put-operation/:id', verifyToken, put_operation);
routes.delete('/api/delete-operation/:id', verifyToken, delete_operation);
routes.post('/api/status/:id', verifyToken, update_Status_Operation);

const { post_signup, post_login, get_logout} = require('../controllers/users.js')

routes.get('/api/logout',  get_logout);
 routes.post('/api/signup', post_signup);
 routes.post('/api/login', post_login);


module.exports = routes;