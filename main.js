const ProductsService = require('./services/product.service');
const service = new ProductsService();

//const root = document.getElementById('root')

let items
async function getProdducts (req, res,){
  console.log('dentro1',service.products)
  try {

    const product = await service.find()
    items = product;
    console.log('dentro2 ')
    console.log(product)
    console.log('dentro')
    console.log(items);

  } catch (error) {

  }
}
getProdducts()
console.log('fuera')
