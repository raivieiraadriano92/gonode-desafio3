const mongoose = require('mongoose');

const Posting = mongoose.model('Posting');

module.exports = {
  async toggle(req, res, next) {
    try {
      const posting = await Posting.findById(req.params.id);

      if (!posting) {
        return res.status(400).json({ error: 'Posting doesn\'t exist' });
      }

      const liked = posting.likes.indexOf(req.userId);

      if (liked === -1) {
        posting.likes.push(req.userId);
      } else {
        posting.likes.splice(liked, 1);
      }

      await posting.save();

      return res.json(posting);
    } catch (err) {
      return next(err);
    }
  },
};
