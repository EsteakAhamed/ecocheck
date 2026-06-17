// server/models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    bytes: {
      type: Number,
      required: [true, 'Bytes is required'],
      min: 0,
    },
    green: {
      type: Boolean,
      required: true,
      default: false,
    },
    co2PerVisit: {
      type: Number,
      required: [true, 'CO2 per visit is required'],
      min: 0,
    },
    pageSizeKB: { type: Number },
    rating: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'E', 'F'],
    },
  },
  { timestamps: true }
);

// Strip trailing slash for display purposes
reportSchema.virtual('displayUrl').get(function () {
  return this.url.replace(/\/$/, '');
});

module.exports = mongoose.model('Report', reportSchema);
