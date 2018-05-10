const mongoose = require('mongoose');

const Posting = mongoose.model('Posting');

module.exports = {
  async create(req, res, next) {
    try {
      const posting = await Posting.findById(req.params.id);

      posting.comments.push({
        ...req.body,
        user: req.userId,
      });

      await posting.save();

      return res.json(posting);
    } catch (err) {
      return next(err);
    }
  },
};
