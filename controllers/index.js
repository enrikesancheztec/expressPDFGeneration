const { retrieveBooks } = require('../services')
const { retrieveBookById } = require('../services')
const { createPDFForBookById } = require('../services')

const getAllBooks = async (res) => {
    try {
        var books = await retrieveBooks();
        res.status(200).json(books);
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const getBookById = async (req, res) => {
    try {
        var id = req.params.id;
        var book = await retrieveBookById(id);

        if (book !== undefined) {
            res.status(200).json(book);
        } else {
            res.sendStatus(204);
        }
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const getBookPDFById = async (req, res) => {
    var id = req.params.id;
    let buffers = [];
    createPDFForBookById(id, buffers, 
        function() {
            let pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=test.pdf',})
            .end(pdfData);
      }
    );
}

module.exports = {
    getAllBooks, getBookById, getBookPDFById
}