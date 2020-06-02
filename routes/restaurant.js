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

module.exports = router;
