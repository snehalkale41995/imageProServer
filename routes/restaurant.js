const express = require("express");
const router = express.Router();
const { poolPromise } = require("../database/db");

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

   module.exports = router;
