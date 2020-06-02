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
    let {ApplicationUserId, MenuItemId, Count} = req.body ;
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
  
    let {OrderId, MenuItemId, Count, Name, Description, Price} = req.body ;
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


  router.post("/orderHeaders", async (req, res) => {
    const { error } = validateOrderDetails(req.body);
  
    if (error) {
      winston.error("Error occurred ", error.message);
      res.status(400).send(error.details[0].message);
      return;
    }
  
    let {OrderId, MenuItemId, Count, Name, Description, Price} = req.body ;
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


  function validateCart(cart) {
    const schema = {
      ApplicationUserId: Joi.string().required(),
      MenuItemId: Joi.number().required(),
      Count: Joi.number().required()
    };
    return Joi.validate(cart, schema);
  }

  function validateOrderDetails(cart) {
    const schema = {
        OrderId: Joi.number().required(),
        MenuItemId: Joi.number().required(),
        Count: Joi.number().required(),
        Name: Joi.string().required(),
        Description: Joi.string().allow("").optional(),
        Price: Joi.number().required()
    };
    return Joi.validate(cart, schema);
  }

   module.exports = router;
