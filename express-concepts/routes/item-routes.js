const express = require("express");
const { asyncHandler } = require("../middleware/errorHandler.js");

const router = express.Router();

const items = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
  {
    id: 4,
    name: "Item 4",
  },
  {
    id: 5,
    name: "Item 5",
  },
];

router.get(
  "/items",
  asyncHandler(async (req, res) => {
    res.json(items);
  })
);

module.exports =  router ;
