const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;