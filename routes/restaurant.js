const express = require("express");
const router = express.Router();
const { poolPromise } = require("../database/db");
const winston = require("winston");
const Joi = require("joi");

router.get("/categories", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request().query("Select * from dbo.Category");
  res.send(result.recordset);
});

router.get("/coupons", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query("Select Id, Name, Discount, MinimumAmount from dbo.Coupon");
  res.send(result.recordset);
});

router.get("/menuItems", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`SELECT Menu.Id , Menu.Name, Menu.Image , Menu.Price, Cat.Name as categoryName
            FROM [dbo].[MenuItem] Menu INNER JOIN [dbo].[Category] Cat ON Menu.CategoryId = Cat.Id;`);
  res.send(result.recordset);
});

router.get("/shoppingCart/:userId", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`SELECT shop.Id, shop.ApplicationUserId, Menu.Name, Menu.Image , Menu.Price, shop.Count
                FROM [dbo].[MenuItem] Menu INNER JOIN [dbo].[ShoppingCart] Shop ON Shop.MenuItemId = Menu.Id where shop.ApplicationUserId = ${req.params.userId}`);
  res.send(result.recordset);
});

router.get("/orders/:userId", async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`SELECT OrderHeader.* , OrderDetails.MenuItemId,   OrderDetails.Count,  OrderDetails.Name, OrderDetails.Price
              FROM [dbo].[OrderHeader] OrderHeader INNER JOIN [dbo].[OrderDetails] [OrderDetails] ON OrderHeader.Id = OrderDetails.OrderId 
              WHERE OrderHeader.UserId = ${req.params.userId} `);
  res.send(result.recordset);
});

router.post("/shoppingCart", async (req, res) => {
  const { error } = validateCart(req.body);

  if (error) {
    winston.error("Error occurred ", error.message);
    res.status(400).send(error.details[0].message);
    return;
  }
  let { ApplicationUserId, MenuItemId, Count } = req.body;
  var query =
    "Insert into dbo.ShoppingCart(ApplicationUserId, MenuItemId, Count)values" +
    "(@ApplicationUserId, @MenuItemId, @Count)";
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("ApplicationUserId", ApplicationUserId)
    .input("MenuItemId", MenuItemId)
    .input("Count", Count)
    .query(query);

  res.status(201).send(result.recordset);
});

router.post("/orderDetails", async (req, res) => {
  const { error } = validateOrderDetails(req.body);

  if (error) {
    winston.error("Error occurred ", error.message);
    res.status(400).send(error.details[0].message);
    return;
  }

  let { OrderId, MenuItemId, Count, Name, Description, Price } = req.body;
  var query =
    "Insert into dbo.OrderDetails(OrderId, MenuItemId, Count, Name, Description, Price)values" +
    "(@OrderId, @MenuItemId, @Count, @Name, @Description, @Price)";
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("OrderId", OrderId)
    .input("MenuItemId", MenuItemId)
    .input("Count", Count)
    .input("Name", Name)
    .input("Description", Description)
    .input("Price", Price)
    .query(query);

  res.status(201).send(result.recordset);
});

router.post("/orderHeader", async (req, res) => {
  const { error } = validateOrderHeaders(req.body);

  if (error) {
    winston.error("Error occurred ", error.message);
    res.status(400).send(error.details[0].message);
    return;
  }

  let {
    UserId,
    OrderDate,
    OrderTotalOriginal,
    OrderTotal,
    PickUpTime,
    CouponCode,
    CouponCodeDiscount,
    Status,
    PaymentStatus,
    Comments,
    PickUpName,
    PhoneNumber,
    TransactionId
  } = req.body;
  var query = `Insert into dbo.OrderHeader(UserId, OrderDate, OrderTotalOriginal, OrderTotal, PickUpTime, CouponCode, 
        CouponCodeDiscount, Status, PaymentStatus, Comments, PickUpName, PhoneNumber, TransactionId)values
        (@UserId, @OrderDate, @OrderTotalOriginal, @OrderTotal, @PickUpTime, @CouponCode, @CouponCodeDiscount, @Status, @PaymentStatus, @Comments, @PickUpName, @PhoneNumber, @TransactionId)`;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("UserId", UserId)
    .input("OrderDate", OrderDate)
    .input("OrderTotalOriginal", OrderTotalOriginal)
    .input("OrderTotal", OrderTotal)
    .input("PickUpTime", PickUpTime)
    .input("CouponCode", CouponCode)
    .input("CouponCodeDiscount", CouponCodeDiscount)
    .input("Status", Status)
    .input("PaymentStatus", PaymentStatus)
    .input("Comments", Comments)
    .input("PickUpName", PickUpName)
    .input("PhoneNumber", PhoneNumber)
    .input("TransactionId", TransactionId)
    .query(query);

  res.status(201).send(result.recordset);
});

function validateCart(cart) {
  const schema = {
    ApplicationUserId: Joi.string().required(),
    MenuItemId: Joi.number().required(),
    Count: Joi.number().required(),
  };
  return Joi.validate(cart, schema);
}

function validateOrderDetails(order) {
  const schema = {
    OrderId: Joi.number().required(),
    MenuItemId: Joi.number().required(),
    Count: Joi.number().required(),
    Name: Joi.string().required(),
    Description: Joi.string().allow("").optional(),
    Price: Joi.number().required(),
  };
  return Joi.validate(order, schema);
}

function validateOrderHeaders(order) {
  const schema = {
    UserId: Joi.string().required(),
    OrderDate: Joi.date().required(),
    OrderTotalOriginal: Joi.number().required(),
    OrderTotal: Joi.number().required(),
    PickUpTime: Joi.date().required(),
    CouponCode: Joi.string().allow("").optional(),
    CouponCodeDiscount: Joi.number().required(),
    Status: Joi.string().required(),
    PaymentStatus: Joi.string().required(),
    Comments: Joi.string().allow("").optional(),
    PickUpName: Joi.string().required(),
    PhoneNumber: Joi.number().required(),
    TransactionId: Joi.string().allow("").optional(),
  };
  return Joi.validate(order, schema);
}

module.exports = router;
