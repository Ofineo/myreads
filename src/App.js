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
        console.log('response', response, book.shelf, value);
        this.setState(state => {
          state[book.shelf].splice(state[book.shelf].findIndex(e => e === book), 1);
          if (value != 'none') state[value].push(book);
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
          render={() => (
            <SearchBooks
              updateShelf={(book, value) => {
                this.updateShelf(book, value);
              }}
              allShelves={this.state.currentlyReading.concat(this.state.read, this.state.wantToRead)}
              currentlyReadingShelf={this.state.currentlyReading}
              readShelf={this.state.read}
              wantToReadShelf={this.state.wantToRead}
            />
          )}
        />
      </div>
    )
  }
}
export default BooksApp;
