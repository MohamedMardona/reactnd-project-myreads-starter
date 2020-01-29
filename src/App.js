import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import  BookCategory  from './BookCategory'
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "./Search";
import { BallBeat } from 'react-pure-loaders';

class BooksApp extends React.Component {
  state = {
    Books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showHeader: true,
    loading: true
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books , loading:false  });
    }).catch((error)=>{
      this.setState({loading: false});
      alert(error)
  });;
  }
   
  updateBookShelf = updatedBook => {
    const newBooksArray = [];
    this.setState({loading: true});
    BooksAPI.update(updatedBook, updatedBook.shelf).then(result => {
      this.state.Books.forEach(book => {
        if (book.id === updatedBook.id) {
          book.shelf = updatedBook.shelf;
        }
        newBooksArray.push(book);
      });
      this.setState({ Books: newBooksArray , loading : false });

        }).catch((error)=>{
          this.setState({loading: false});
          alert(error)
      });;
  };
  
  handleBackButtonEvent = status =>{
    this.setState({ showHeader: status });

  }
  addNewBook = newBook => {
    const existedBook = this.state.Books.find(book => book.id === newBook.id);
    if (existedBook) {
      this.updateBookShelf(newBook);
    } else
    this.setState({loading: true});
      BooksAPI.update(newBook, newBook.shelf).then(() => {
        this.setState({ Books: this.state.Books.concat([newBook]) , loading:false  });
      }).catch((error)=>{
        this.setState({loading: false});
        alert(error)
    });;
      
  };
  render() {
    
    return (
      <div className="app">
        <div className="loader">
        <BallBeat
            color={'#60ac5d'}
            loading={this.state.loading}
          />
        </div>
         
          <div className="list-books">
            {this.state.showHeader && (
              <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            )}
            
            <div className="list-books-content">
            <Route
              exact
              path="/search"
              render={({ history }) => (
                <Search
                selectedShelf={Book => {
                    this.addNewBook(Book);
                    history.push("/");
                  }}
                  booksList={this.state.Books}
                  backEvent={this.handleBackButtonEvent}
                />
              )}
            ></Route>

            <Route
             exact
              path="/"
              render={() => (
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <BookCategory
                          selectedShelf={this.updateBookShelf}
                          Books={this.state.Books}
                          bookShelf="currentlyReading"
                        />
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <BookCategory
                          selectedShelf={this.updateBookShelf}
                          Books={this.state.Books}
                          bookShelf="wantToRead"
                        />
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <BookCategory
                          selectedShelf={this.updateBookShelf}
                          Books={this.state.Books}
                          bookShelf="read"
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            ></Route>
         
            </div>
            
          

            <div className="open-search">
            <Link className="open-search" to="/search">
              <button onClick={() => this.setState({ showHeader: false })}>Add a book</button>
              </Link>
            </div>
          </div>
      
      </div>
    )
  }
}

export default BooksApp
