const express = require('express')

const { getAllBooks } = require('../controllers')
const { getBookById } = require('../controllers')
const { getBookPDFById } = require('../controllers')

const router = express.Router()

router.get('/books', getAllBooks)

router.get('/book/:id', getBookById)

router.get('/book/:id/pdf', getBookPDFById)

module.exports = router