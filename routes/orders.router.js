const express = require('express');
const passport = require('passport')

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema,createOrderSchema,addItemSchema } = require('./../schemas/order.schema');
const CustomersService = require('../services/customers.service');
const {checkRoles} = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();
const serviceUser = new CustomersService();

router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
 async (req, res, next) => {
  try {
    const products = await service.find();
    res.setHeader('Content-Type', 'application/json')
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Order = await service.findOne(id);
      res.setHeader('Content-Type', 'application/json')
      res.json(Order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {

      const dataOrder = await serviceUser.findOne2(req.user.sub)
      const body = {customerId:dataOrder[0].dataValues.id}
      const newOrder = await service.create(body);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  checkRoles("customers",'admin'),
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

router.post('/add-item',
passport.authenticate('jwt', {session:false}),
checkRoles("customers",'admin'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItems = await service.addItem(body);
      res.setHeader('Content-Type', 'application/json')
      res.status(201).json(newItems);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;

