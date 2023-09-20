const express = require('express')
const router = express.Router()
const path = require('path')

const multer = require('multer')
const uploadPath = path.join('public', Book.coverImageBasePath)

const Book = require('../models/book')
const Author = require('../models/author')
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})



// all books routes
router.get('/', async (req, res) => {
res.send("All Books")
})

// new book routes
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({})
    const book = new Book()
    res.render('books/new', {
      authors : authors,
      book : book
    })
  } catch {
    res.redirect('/books')
}


})

// create book route
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description
  })

  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
  } catch {
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName)
    }
    renderNewPage(res, book, true)
  }
})
module.exports = router