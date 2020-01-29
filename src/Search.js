import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksItem from "./BooksItem";
import { BallBeat } from 'react-pure-loaders';



export default class Search extends Component {
  state = {
    retrivedBooks: [],
    searchQuery: "",
    loading: false,
  };
  handleQuery = event => {
    const query = event.target.value;
    this.setState({ searchQuery: query });
    this.retrieveSearchData(query);
  };
  componentDidMount(){
    this.props.backEvent(false)
    }
  retrieveSearchData = query => {
    if (query !== "") {
      this.setState({loading: true});
      BooksAPI.search(query).then(result => {
        if (result && result.length > 0) {
          this.setState({ retrivedBooks: result , loading: false });
        } else {
          this.setState({ retrivedBooks: [] ,loading: false});
          alert('Not Found');
        }
      }).catch((error)=>{
        this.setState({loading: false});
          alert(error)
      });
    }
  };

  render() {
    const booksList = this.props.booksList;
    const retrivedBooks =
      this.state.searchQuery !== "" ? this.state.retrivedBooks : [];
    return (
      <div className="search-books">
        <div className="loader">
        <BallBeat
            color={'#60ac5d'}
            loading={this.state.loading}
          />
        </div>
        <div className="search-books-bar">
          <Link to="/">
            <button onClick={() =>  this.props.backEvent(true)} className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleQuery}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {retrivedBooks.length > 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {retrivedBooks.map(book => (
                <li key={book.id}>
                  <BooksItem
                    newItem="true"
                    booksList={booksList}
                    Book={book}
                    selectedShelf={this.props.selectedShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}
