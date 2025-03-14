const express = require('express');
const { addBook, getBooks, returnBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.put('/return', returnBook);

module.exports = router;