const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Iphone",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        price: 130000,
        desc: "very costly"
    },
    {
        name: "Macbook",
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 200000,
        desc: "very very costly"
    },
    {
        name: "Iwatch",
        img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        price: 50000,
        desc: "somehow affordable"
    },
    {
        name: "Iearpod",
        img: "https://images.unsplash.com/photo-1585386959984-a4155223166a",
        price: 20000,
        desc: "ok ok"
    },
    {
        name: "Apple tab",
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        price: 100000,
        desc: "slick"
    }
];

async function seedDB(){
    await Product.deleteMany({}); // 🔴 important (avoid duplicates)
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports = seedDB;