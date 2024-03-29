const express = require('express');
const passport = require('passport')

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema ,queryProductSchema} = require('./../schemas/product.schema');
const {checkRoles} = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new ProductsService();



router.get('/',
  validatorHandler(queryProductSchema, 'params'),
 async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.setHeader('Content-Type', 'application/json')
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.setHeader('Content-Type', 'application/json')
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles("admin","visitas"),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
   async (req, res, next) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.setHeader('Content-Type', 'application/json')
      res.json(product);
    } catch (error) {
      next(error);
    }
   }
);

router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("admin"),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
