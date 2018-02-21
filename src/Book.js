import React, { Component } from 'react'
import SelectShelf from './SelectShelf'


class Book extends Component {
    render() {
        return (
            <ol className="books-grid">
                {this.props.allBooks.filter(books=> books.shelf === this.props.shelf ).map(book => (
                    <li>
                        <div className="book">
                            <div className="book-top">
                                <img src={book.imageLinks.smallThumbnail} />
                                <SelectShelf />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default Book;