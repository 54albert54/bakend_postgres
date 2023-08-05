const boom = require('@hapi/boom');

const { models } =require('../librerias/sequelize')
class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Categories.create(data)
    return newCategory;

  }

  async find() {
    const category = await models.Categories.findAll()
    return category;
  }

  async findOne(id) {
    const category = await models.Categories.findByPk(id,{
      include:['products']
    });
    if (!category) {
    throw boom.notFound('user no found')
    }
    return  category ;
  }

  async update(id, changes) {
    const category = await this.findOne(id)

    const rta = await category.update(changes)
    return rta
  }

  async delete(id) {
    const category =await this.findOne(id)

    await category.destroy()
    return { id };
  }

}

module.exports = CategoryService;
