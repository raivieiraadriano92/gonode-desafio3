const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async toInvite(req, res, next) {
    try {
      if (req.params.guestUserId === req.userId) {
        return res.status(400).json({ error: 'You can not send an invitation to yourself' });
      }

      const user = await User.findById(req.params.guestUserId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const invite = user.friendshipInvitations.indexOf(req.userId);

      if (invite !== -1) {
        return res.status(400).json({ error: 'Invitation already sent' });
      }

      user.friendshipInvitations.push(req.userId);

      await user.save();

      return res.json({});
    } catch (err) {
      return next(err);
    }
  },

  async acceptInvite(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const invite = me.friendshipInvitations.indexOf(req.params.guestUserId);

      if (invite === -1) {
        return res.status(400).json({ error: 'Invite not found' });
      }

      me.friendshipInvitations.splice(invite, 1);
      me.friends.push(req.params.guestUserId);

      await me.save();

      const user = await User.findById(req.params.guestUserId);
      user.friends.push(me.id);
      user.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
};
