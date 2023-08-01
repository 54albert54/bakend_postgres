
const { Op } = require('sequelize')
const boom = require('@hapi/boom');

const { models } = require('../librerias/sequelize.js');


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();

  }

  async generate() {



  }

  async create(data) {
    const newProduct = await models.Products.create(data)
    return newProduct;
  }

  async find(query) {
    const options ={
      include:['category'],
      where:{}
    }
    const {limit,offset} = query;
    if (limit,offset){
      options.limit = limit,
      options.offset = offset
    }
    const {price }= query;

    if (price){
      options.where.price = price
    }
    const {price_min,price_max }= query;


    if (price_min ){
      options.where.price = {
        [Op.gte]:price_min
      }
    }

    if ( price_max ){
      options.where.price = {
        [Op.lte]:price_max
      }
    }
    if (price_min && price_max ){

      options.where.price = {
        [Op.between]: [price_min, price_max],

      }
    }


    const products = await models.Products.findAll(options)

    this.products = products
   return products;
  }



  async findOne(id) {
    const product = await models.Products.findByPk(id);
    if (!product) {
    throw boom.notFound('Costumer no found')
    }
    return  product ;

  }

  async update(id, changes) {

    const product = await this.findOne(id)

    const rta = await product.update(changes)
    return rta

  }

  async delete(id) {
    const product =await this.findOne(id)

    await product.destroy()
    return { id };
  }

}

module.exports = ProductsService;
