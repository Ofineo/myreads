import React, { Component } from 'react'

class SelectShelf extends Component {

    changeShelf = (e) => {
        this.props.updateShelf(this.props.currentBook, e.target.value);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.currentBook.shelf} onChange={this.changeShelf}>
                    <option value="none" disabled>Move to...</option>
                    <option id="currentlyReading" value="currentlyReading">Currently Reading</option>
                    <option id="wantToRead" value="wantToRead">Want to Read</option>
                    <option id="read" value="read">Read</option>
                    <option id="none" value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectShelf;