const axios = require("axios");

const books = require("./books.js");

const baseURL = "http://localhost:3000";

books.forEach(async (book) => {
  const response = await axios.post(`${baseURL}/api/books`, book);
  if (response.status != 200) {
      console.log(`Error adding ${book.title}, code ${response.status}`);
  }
    else {
        console.log(book.title);
    }
});
