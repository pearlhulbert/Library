import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [library, setLibrary] = useState([]);
  const [bookShelf, setbookShelf] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const fetchLibrary = async() => {
    try {      
      const response = await axios.get("/api/books");
      console.log(response.data)
      setLibrary(response.data);
    } catch(error) {
      setError("error retrieving library: " + error);
    }
  }
  const createBook = async() => {
    try {
      await axios.post("/api/books", {title: title, author: author, genre: genre});
    } catch(error) {
      setError("error adding a book: " + error);
    }
  }
  const deleteOneBook = async(book) => {
    try {
      await axios.delete("/api/books/" + book.id);
    } catch(error) {
      setError("error deleting a book" + error);
    }
  }
  
  const fetchShelf = async() => {
    try {      
      const response = await axios.get("/api/bookshelf");
      console.log(response.data)
      setbookShelf(response.data);
    } catch(error) {
      setError("error retrieving bookshelf: " + error);
    }
  }
  
  const addOneBook = async(book) => {
    try {
      await axios.post("/api/bookshelf/" + book.id);
    } catch(error) {
      setError("error adding a book to shelf" + error);
    }
  }
  
  const removeOneBook = async(book) => {
    try {
      await axios.delete("/api/bookshelf/" + book.id);
    } catch(error) {
      setError("error removing a book from shelf" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    console.log(useEffect)
    fetchLibrary();
    fetchShelf();
  },[]);

  const addBook = async(e) => {
    e.preventDefault();
    await createBook();
    fetchLibrary();
    setTitle("");
    setAuthor("");
    setGenre("");
  }

  const deleteBook = async(book) => {
    await deleteOneBook(book);
    fetchLibrary();
  }
  
  const addToShelf = async(book) => {
    await addOneBook(book);
    fetchShelf();
  }
  
  const removeFromShelf = async(book) => {
    await removeOneBook(book);
    fetchShelf();
  }
 
  // render results
  return (
    <div className="App">
      {error}
      <div id="bookHeader">
        <h1 id= "pageTitle">My Book Nook</h1>
      </div>
      <h2>Register Book</h2>
      <div>
      <form onSubmit={addBook}>
        <div>
          <label>
            Title: 
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author: 
            <input type="text" value={author} onChange={e=>setAuthor(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Genre: 
            <input type="text" value={genre} onChange={e=>setGenre(e.target.value)}></input>
          </label>
        </div>
        <input id= "submit" type="submit" value="Submit" />
      </form>
      </div>
      <div id="displayDiv">
      <div id="libraryDiv">
      <h2>Library</h2>
      <h4>Click book to add to shelf</h4>
      {library.map( book => (
        <div key={book.id} className="product">
          <div className="price">
            <p><i onClick={e => addToShelf(book)}>{book.title}, {book.author}, {book.genre}</i></p>
          </div>
        </div>
      ))} 
      </div>
      <div id="bookshelfDiv">
      <h2>My Book Shelf</h2>
      {bookShelf.map( book => (
        <div key={book.id} className="book">
          <div className="individualBookDiv">
            <p onClick ={e => removeFromShelf(book)}>{book.name}</p>
          </div>
        </div>
      ))} 
      </div>
    </div>
    </div>
  );
}

export default App;
