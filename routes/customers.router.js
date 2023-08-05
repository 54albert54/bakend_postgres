const express = require('express');
const passport = require('passport')

const CustomersService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('../schemas/constumers.shema');
const {checkRoles} = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new CustomersService();

router.get('/',

async (req, res, next) => {

  try {
    const categories = await service.find();
    res.setHeader('Content-Type', 'application/json')
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.setHeader('Content-Type', 'application/json')
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/a/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne2(id);
      res.setHeader('Content-Type', 'application/json')
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newCategory = await service.create(body);
      // res.setHeader('Content-Type', 'application/json')
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.setHeader('Content-Type', 'application/json')
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
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

