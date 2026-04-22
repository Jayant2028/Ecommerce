const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Iphone",
        img: "https://images.search.yahoo.com/search/images?p=iphone+17",
        price: 130000,
        desc: "very costly"
    },
    {
        name: "Macbook",
        img: "https://images.search.yahoo.com/search/images?p=macbook",
        price: 200000,
        desc: "very very costly"
    },
    {
        name: "Iwatch",
        img: "https://tse4.mm.bing.net/th/id/OIP.ZJ9SCEm10MBq3KfRnv-TYgHaEJ",
        price: 50000,
        desc: "somehow affordable"
    },
    {
        name: "Iearpod",
        img: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i4TI_iQvnnak/v0/-1x-1.jpg",
        price: 20000,
        desc: "ok ok"
    },
    {
        name: "Apple tab",
        img: "https://tse3.mm.bing.net/th/id/OIP._sBdNHPAD3jvx6hsLPilhQHaEK",
        price: 100000,
        desc: "slick"
    }
]

async function seedDB(){

    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports = seedDB;
/////