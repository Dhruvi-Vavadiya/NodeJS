const router=require('express').Router();

router.get('/', (req, res) => {
  res.send('Product Home Page');
});

router.get('/details', (req, res) => {
  res.send('Product Details Page');
});

router.get('/list', (req, res) => {
  res.send('Product list Page');
});
module.exports = router;