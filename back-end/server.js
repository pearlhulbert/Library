const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String
});

bookSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
 bookSchema.set('toJSON', {
  virtuals: true
});

const shelfSchema = new mongoose.Schema({
    title: String
});

shelfSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
 shelfSchema.set('toJSON', {
  virtuals: true
});

app.get('/api/books', async (req, res) => {
  try {
    let books = await Book.find();
    res.send({books: books});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/books:id', async (req, res) => {
 try {
    let book = await Book.find({
      _id: req.params.id
    });
    res.send({book})
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/books', async (req, res) => {
    const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre
  });
  try {
    await book.save();
    res.send({book:book});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/shelf/:id', async (req, res) => {
    try {
        const foundBook = await Shelf.find({
            _id: req.params.id
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    if (foundBook) {
        res.send({foundBook});
        res.sendStatus(200);
    }
    else {
        const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
        });
    }
      try {
        await book.save();
        res.send({shelf:book});
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

app.get('/api/shelf', async (req, res) => {
  try {
    let shelf = await Shelf.find();
    res.send({shelf: shelf});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/shelf/:id', async (req, res) => {
  try {
    await Book.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3000, () => console.log('Server listening on port 3000!'));