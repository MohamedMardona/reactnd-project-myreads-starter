import React, { Component } from "react";
import BooksItem from "./BooksItem";

export default  class BookCategory extends Component {
  render() {
    const bookShelf = this.props.bookShelf;
    const Books = this.props.Books;
    const filteredBooks = bookShelf ? Books.filter(book => book.shelf === bookShelf) : Books;
    // console.log('bookShelf',bookShelf);
    // console.log('Books',Books);
    // console.log('filteredBooks',filteredBooks);

    return (
      <ol className="books-grid">
        {filteredBooks.map(book => (
          <li key={book.id}>
            <BooksItem Book={book} selectedShelf={this.props.selectedShelf} />
          </li>
        ))}
      </ol>
    );
  }
}
;
