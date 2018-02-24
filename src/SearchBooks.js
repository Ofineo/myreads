import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    foundBooks: {}
  }

  componentDidMount(){
    document.getElementById('search-box').focus();
  }

  updateShelf = (book, value) => {
    book.shelf = value;
    this.props.updateShelf(book, value);
  }

  updateQuery = (query) => {
    this.setState({ query })
    console.log(this.state.query.length);

    if(this.state.query.length >= 1){
       BooksAPI.search(this.state.query)
      .then(response => {
        console.log(response);
        this.setState({ foundBooks: response })
      })
      }else{
        this.setState({ foundBooks: {} })
      }
    }
  

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input id="search-box" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.length > 0 && (this.state.foundBooks.map(book => (
              <Book
                key={book.id}
                book={book}
                shelf={this.props.shelf}
                updateShelf={(book, value) => {
                  this.updateShelf(book, value);
                }}
              />
            )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;