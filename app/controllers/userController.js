const mongoose = require('mongoose');

const User = mongoose.model('User');
const Posting = mongoose.model('Posting');

module.exports = {
  async me(req, res, next) {
    try {
      const user = await User.findById(req.userId);

      return res.json({
        user,
      });
    } catch (err) {
      return next(err);
    }
  },


  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { friends } = user;

      const posts = await Posting
        .find({
          user: { $in: [user.id, ...friends] },
        })
        .limit(50)
        .sort('-createdAt');

      return res.json([posts]);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.status(400).json({ erro: 'Password doesn\'t match' });
      }

      const user = await User.findByIdAndUpdate(id, {
        name,
        username,
      }, {
        new: true,
      });

      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
