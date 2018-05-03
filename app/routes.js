const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');

const authMiddleware = require('./middlewares/auth');

/**
 * Auth
 */
routes.post('/singin', controllers.authController.singin);
routes.post('/singup', controllers.authController.singup);

/**
 * Auth routes
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.get('/users/me', controllers.userController.me);
routes.put('/users', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

/**
 * posts
 */
routes.post('/posts', controllers.postingController.create);
routes.delete('/posts/:id', controllers.postingController.destroy);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

module.exports = routes;
