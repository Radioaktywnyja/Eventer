const express = require('express');
const router = express.Router();
const Eventer = require('../models/eventer');

module.exports = function() {

  /* Get eventer listings */
  router.get('/read', async (req, res) => {
    try {
      let eventer_list = await Eventer.find({});
      res.send(eventer_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an eventer entry */
  router.post("/create", async ( req, res ) => {
      let eventer = new Eventer({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         email_address: req.body.email_address,
         event_date: req.body.event_date
      });
      try{
        let newEventer = await eventer.save();
        res.send({ response: 'success'});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get a listing by a eventer id */
  router.get('/readbyid/', async ( req, res ) => {
     try {
       let record = await Eventer.findOne({ _id: req.query.id });
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });

  /* Update an eventer entry */
  router.put('/update', async ( req, res ) => {
      try {
        let eventer = await Eventer.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete eventer entry */
  router.delete('/delete', async (req, res) => {
      try {
        let eventer = await Eventer.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};
