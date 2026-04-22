const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() 
const {validateProduct} = require('../middleware')

//  products
router.get('/products' , async(req,res)=>{
    let products = await Product.find({});
    res.render('products/index' , {products});
})


// new product
router.get('/product/new' , (req,res)=>{
    res.render('products/new');
})

// add product
router.post('/products' , async(req,res)=>{
    let {name , img , price , desc} = req.body;
    await Product.create({name , img , price , desc})
    res.redirect('/products');
})


// particular product
router.get('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show' , {foundProduct})
})


//edit the product
router.get('/products/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit' , {foundProduct})
})

//edit the data in database
router.patch('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img , price , desc}  )
    res.redirect(`/products/${id}`);
})


// delete a product
router.delete('/products/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        const product = await Product.findById(id);

        for(let id of product.reviews){
            await Review.findByIdAndDelete(id);
        }

        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})


module.exports = router;
