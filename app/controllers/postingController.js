const mongoose = require('mongoose');

const Posting = mongoose.model('Posting');

module.exports = {
  async create(req, res, next) {
    try {
      const posting = await Posting.create({
        ...req.body,
        user: req.userId,
      });

      return res.json(posting);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Posting.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
