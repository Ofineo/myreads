import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then(response => {

        let currentlyReading, wantToRead, read;

        currentlyReading = response.filter(book => {
          if (book.shelf === "currentlyReading") return book;
        });
        wantToRead = response.filter(book => {
          if (book.shelf === "wantToRead") return book;
        });
        read = response.filter(book => {
          if (book.shelf === "read") return book;
        });

        return this.setState({
          currentlyReading,
          wantToRead,
          read
        })
      })
  }
  updateShelf = (book, value) => {
    BooksAPI.update(book, value)
      .then(response => {
        console.log('response', response, book, value);
        this.setState(state => {
          state[book.shelf].splice(state[book.shelf].findIndex(e => e === book), 1);
          book.shelf = value;
          state[value].push(book);
        })
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
                <BookShelf
                  shelf="currentlyReading"
                  shelfBooks={this.state.currentlyReading}
                  updateShelf={(book, value) => {
                    this.updateShelf(book, value);
                  }}
                />
                <BookShelf
                  shelf="wantToRead"
                  shelfBooks={this.state.wantToRead}
                  updateShelf={(book, value) => {
                    this.updateShelf(book, value);
                  }}
                />
                <BookShelf
                  shelf="read"
                  shelfBooks={this.state.read}
                  updateShelf={(book, value) => {
                    this.updateShelf(book, value);
                  }}
                />
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
