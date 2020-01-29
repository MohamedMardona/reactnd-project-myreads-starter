import React, { Component } from "react";

export default class BooksItem extends Component {
  SelectShelf = event => {
    const newShelf = event.target.value;
    const updatedBookShelf = this.props.Book;
    updatedBookShelf.shelf = newShelf;
     this.props.selectedShelf(updatedBookShelf);
  };

  render() {
    const Book = this.props.Book;
    const booksList = this.props.booksList;
    if (booksList) {
      const existedBook = booksList.find(item => item.id === Book.id);
      if (existedBook) {
        Book.shelf = existedBook.shelf;
      } else {
        Book.shelf = "none";
      }
    }

  
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: Book.imageLinks
                ? `url(${Book.imageLinks.thumbnail})`
                : ""
            }}
          ></div>
          <div className="book-shelf-changer">
            <select defaultValue={Book.shelf} onChange={this.SelectShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{Book.title}</div>
        {Book.authors && <div className="book-authors">{Book.authors}</div>}
      </div>
    );
  }
}
 
