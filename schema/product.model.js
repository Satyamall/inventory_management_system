
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: {type: Number, required: true},
    operation: {type: String, required: true}
},
{
    versionKey: false
}
)

const Product = mongoose.model("products",productSchema);

module.exports = Product;