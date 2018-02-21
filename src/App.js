import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
    books: [],
    shelves: ["currentlyReading", "wantToRead", "read"]

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then(response => {
        console.log(response);
        return this.setState({ books: response })
      })
  }



  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <BookShelves allBooks={this.state.books} shelves={this.state.shelves} />
              </div>
              <div className="open-search">
                <Link to="/search" >Add a book</Link>
              </div>
            </div>
          )} />
        <Route
          path="/search"
          component={SearchBooks}
        />
      </div>
    )
  }
}

export default BooksApp;
