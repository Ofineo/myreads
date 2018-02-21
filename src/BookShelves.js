import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Book from './Book'

class BookShelves extends Component {
  
  render() {
    return (
      <div>
        {this.props.shelves.map(shelf=>(
           <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
              <Book allBooks={this.props.allBooks} shelf={shelf} />
            </div>
          </div>
        ))}
         
      </div>
    )
  }
}
export default BookShelves;
