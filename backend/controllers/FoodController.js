
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Food } from "../models/FoodModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addFoods = async (req, res) => {
    try {
        // 1. Check if all required fields are present
        if (!req.body.name || !req.body.price || !req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: name, price, and image are required" 
            });
        }


        const food = new Food({
            name: req.body.name,
            description: req.body.description || '',
            price: Number(req.body.price),
            category: req.body.category || 'other',
            image: req.file.filename,
            isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true
        });

    
        await food.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Food item added successfully",
            data: food
        });
    } catch (error) {
        console.error("Error adding food item:", error);
        
 
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: messages
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: "Server error while adding food item"
        });
    }
};
