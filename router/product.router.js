
const express = require("express");
const Product = require("../schema/product.model");

const router = express.Router();

// Post Multiple products
router.post("/multiple",async (req,res)=>{
    try{
        const products = await Product.insertMany(req.body);

        if(!products) return res.status(400).json({message: "Product is not pushed into Database"})

        res.status(201).json({payload: products});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
})

// Post Single product
router.post("/single",async (req,res)=>{
    try{
        const product = await Product.create(req.body);

        if(!product) return res.status(400).json({message: "Product is not pushed into Database"})

        res.status(201).json({data: product});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
})

router.get("/",async (req,res)=>{
    try{
        const products = await Product.find({});

        if(!products) return res.status(400).json({message: "No Products Present in Database"})

        res.status(200).json({data: products});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
})

router.get("/:productId", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.productId);

        if(!product) return res.status(400).json({message: "No Product Present in Database of This ProductId"})

        res.status(200).json({data: product});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
});

router.delete("/:productId", async(req,res)=>{
    try{
        const product = await Product.findOneAndRemove(req.params.productId);

        if(!product) return res.status(400).json({message: "No Product Present in Database of This ProductId"})

        res.status(201).json({data: product});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
});

router.patch("/:productId/add", async(req,res)=>{
    try{
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            {  
              $inc: { quantity: 1 },
              operation: "add"
            },
            {
                new: true
            }
        )

        if(!product) return res.status(400).json({message: "No Product Present in Database of This ProductId"})

        res.status(200).json({data: product});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
});

router.patch("/:productId/subtract", async(req,res)=>{
    try{
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            {  
              $inc: { quantity: -1 },
              operation: "subtract"
            },
            {
                new: true
            }
        )

        if(!product) return res.status(400).json({message: "No Product Present in Database of This ProductId"})

        res.status(200).json({data: product});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
});

module.exports = router;
