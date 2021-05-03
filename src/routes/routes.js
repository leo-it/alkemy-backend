const routes = require('express').Router();

const { get_operations, post_operation, put_operation, delete_operation } = require('../controllers/operations.js')

routes.get('/api/operations', get_operations)
routes.post('/api/post-operation', post_operation);
routes.put('/api/put-operation/:id', put_operation);
routes.delete('/api/delete-operation/:id', delete_operation);

module.exports = routes;