const { selectBooks } = require('../db')
const { selectBookById } = require('../db')
const PDFDocument =  require('pdfkit');

const retrieveBooks = async () => {
    try {
        return await selectBooks();
    } catch (e) {
        throw new Error(e.message)
    }
}

const retrieveBookById = async (id) => {
    try {
        return await selectBookById(id);
    } catch (e) {
        throw new Error(e.message)
    }
}

const createPDFForBookById = async (id, buffers, callback) => {
    // https://npmcompare.com/compare/html-pdf,pdfkit,pdfmake
    // https://pdfkit.org/docs/guide.pdf
    var book = await retrieveBookById(id);

    var myDoc = new PDFDocument({bufferPages: true});
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', callback);  

    if (book !== undefined) {
        myDoc.font('Times-Roman')
        .fontSize(12)
        .text(`${book.title}, ${book.author}`);
    } else {
        myDoc.font('Times-Roman')
        .fontSize(12)
        .fillColor('red')
        .text(`Invalid book id ${id}`);
    }

    myDoc.end();
}

module.exports = {
    retrieveBooks, retrieveBookById, createPDFForBookById
}