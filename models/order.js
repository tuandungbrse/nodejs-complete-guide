var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema(
  {
    products: [
      {
        product: {
          type: Object,
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    user: {
      name: {
        type: String,
        required: true
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('order', Order);
