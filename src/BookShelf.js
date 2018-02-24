import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  updateShelf = (book, value) => {
    this.props.updateShelf(book, value);
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.shelfBooks.length > 0 && (this.props.shelfBooks.map(book => (
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
      </div>
    )
  }
}
export default BookShelf;
