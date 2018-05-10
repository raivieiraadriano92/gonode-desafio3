const mongoose = require('mongoose');

const PostingSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 280,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  comments: [{
    comment: {
      type: String,
      required: true,
      trim: true,
      maxLength: 280,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Posting', PostingSchema);
