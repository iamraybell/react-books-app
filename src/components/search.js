import React from 'react';
import { BookList } from './bookList';

export class Search extends React.Component  {
    state = {
        query: '',
        currentShownBooks: [],
    }

    handleInputChange(input) {
        this.setState(
            (prevState => {
            return {
                    ...prevState,
                    query: input,
                } 
            }
            ),
            this.handleSearch
        )
    }
    
    handleSearch() {
        if(this.state.query && this.state.query.trim()){
            this.props.search(this.state.query)
            .then(books => {
                for(let book of books){
                    if(this.props.cacheByIds[book.id]){
                        book.shelf = this.props.cacheByIds[book.id].shelf
                    }
                }
                this.setState((prevState) =>{
                   return {
                       ...prevState,
                       currentShownBooks: books
                   }
                })
            })
        }else{
                this.setState((prevState) =>{
                    return {
                        ...prevState,
                        currentShownBooks: [],
                    }
                 })
        }
    }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.props.history.goBack() }>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value ={ this.state.query}
                    onChange = {(e) => this.handleInputChange(e.target.value)}

                />
    
              </div>
            </div>
            <div className="search-books-results">
                {
                    this.state.currentShownBooks.error &&(
                        <p>No items Match your query. Please try again.</p>
                    )
                }
                {
                    this.state.currentShownBooks.length === 0 &&(
                        <p>Please type into the search book to begin a search.</p>
                    )
                }
                {
                    this.state.currentShownBooks.length > 0 &&(
                        <BookList
                            books={this.state.currentShownBooks}
                        />
                    )
                }

            </div>
          </div>
        )
    } 
}