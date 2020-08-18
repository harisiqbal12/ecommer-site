const express = require('express');
const cartRepo = require('../repositories/carts');
const productRepo = require('../repositories/product');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async(req, res) => {
    let cart;

    if (!req.session.cartId) {
        cart = await cartRepo.create({ items: [] })

        req.session.cartId = cart.id;

    }else {

        cart = await cartRepo.getOne(req.session.cartId);
    }

    const existenceItem = cart.items.find(item => item.id === req.body.productId);
    if (existenceItem) {
        existenceItem.quantity++;

    }else {
        cart.items.push({ id: req.body.productId, quantity: 1 })
    }

    await cartRepo.update(cart.id, {
        items: cart.items
    });

    res.status(204).send();
  
});

router.get('/cart', async(req, res) => {
    console.log(req.session.cartId);

    if(!req.session.cartId) {
        res.redirect('/');
    }

    const cart = await cartRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productRepo.getOne(item.id);

        item.product = product;

    }

    res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async(req, res) => {
    const { itemId } = req.body;
    const cart = await cartRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);
    await cartRepo.update(req.session.cartId, { items });

    res.redirect('/cart')
});



module.exports = router;