import React from 'react';
import { Book }  from './book';
export const BookList = (props) => {
    return (
        <ol className="books-grid">
            {props.books.map((book) => {
                    console.log(book)
                return (
                    <li key={book.id}>
                        <Book
                            id ={book.id}
                            shelf={book.shelf?book.shelf:'none'}
                            author={book.author}
                            title={book.title}
                            image={book.imageLinks.thumbnail}
                            
                        />
                    </li>
                )
            })}
        </ol>
    )
}