const repository = require('./repository');

class ProductRepository extends repository {}


module.exports = new ProductRepository('product.json');