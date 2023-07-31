const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema,createOrderSchema,addItemSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Order = await service.findOne(id);
      res.json(Order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItems = await service.addItem(body);
      res.status(201).json(newItems);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;

