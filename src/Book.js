import React, { Component } from 'react'
import SelectShelf from './SelectShelf'


class Book extends Component {

    updateShelf = (book, value) => {
        this.props.updateShelf(book, value);
    }
    bookImage = () => {
        return this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : 'http://via.placeholder.com/100x150'
    }
    bookAuthor= ()=>{
        return this.props.book.authors? this.props.book.authors :'Anonymous Author'
    }


    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <img src={this.bookImage()} alt="book cover" />
                        <SelectShelf
                            currentBook={this.props.book}
                            updateShelf={(book, value) => {
                                this.updateShelf(this.props.book, value);
                            }}
                        />
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.bookAuthor()}</div>
                </div>
            </li>
        )
    }
}

export default Book;