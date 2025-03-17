import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  images: { type: [String], required: false }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  specificDescription: { type: String, required: false },
  category: { type: String, required: true },
  wholesalePrice: { type: Number, required: true },  
  retailPrice: { type: Number, required: true },  
  quantity: { type: Number, required: true },
  supplierName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false } 
  
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;