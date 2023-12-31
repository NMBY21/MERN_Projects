const express = require("express");
const router = express.Router();
const auth = requier('../../middleware/auth.js')
// item model
// const item = require("../../models/Item");
const Item = require("../../models/Item")

// @route GET api/items
// @description GET all items
// @access Public
router.get("/",(req,res) => {
  Item.find()
  .sort({data: -1})
  .then(items => res.json(items));
}); 

// @route POST api/items
// @desc create a POST
// @access Public
router.post("/",auth, (req,res) => {
  const newItem= new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));

}); 

// @route DELETE api/items/:id
// @desc Delete an Item 
// @access Public
router.delete("/:id",auth,(req,res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
  });
  

module.exports = router;

