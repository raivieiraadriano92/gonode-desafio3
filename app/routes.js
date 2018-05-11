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
 * Friends
 */
routes.get('/friendship-invitations/:guestUserId/send', controllers.friendshipInvitationController.toInvite);
routes.get('/friendship-invitations/:guestUserId/accept', controllers.friendshipInvitationController.acceptInvite);

/**
 * posts
 */
routes.post('/posts', controllers.postingController.create);
routes.delete('/posts/:id', controllers.postingController.destroy);

/**
 * comments
 */
routes.post('/posting/:id/comment', controllers.commentController.create);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

module.exports = routes;
