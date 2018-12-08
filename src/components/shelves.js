import React from 'react';
import { BookList } from './bookList';

export class Shelves extends React.Component{

    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <BookList
                            books={this.props.currentlyReading}
                            changeShelf={this.props.changeShelf}
                        />
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <BookList
                            books={this.props.read}
                            changeShelf={this.props.changeShelf}
                        />
                    </div>
                </div>  
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <BookList
                            books={this.props.wantToRead}
                            changeShelf={this.props.changeShelf}
                        />
                    </div>
                </div>  
            </div>        
        )
    }
}