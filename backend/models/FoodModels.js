import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name is required'],
        
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
       
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
       
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add text index for searching
foodSchema.index({ name: 'text', description: 'text', category: 'text' });

// Create and export the model
const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

export { Food };