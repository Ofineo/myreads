import React, { Component } from 'react'
import SelectShelf from './SelectShelf'


class Book extends Component {

    updateShelf = (book, value) => {
        this.props.updateShelf(book, value);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <img src={this.props.book.imageLinks.smallThumbnail} alt="book cover" />
                        <SelectShelf
                            currentBook={this.props.book}
                            updateShelf={(book, value) => {
                                this.updateShelf(this.props.book, value);
                            }}
                        />
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book;