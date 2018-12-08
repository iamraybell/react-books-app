import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Search } from './components/search';
import { Shelves } from './components/shelves';

class BooksApp extends React.Component {
  state = {
    cacheByIds:{},
    currentlyReading:[],
    read:[],
    wantToRead:[],
  }

  getAllBooksOnShelves(cb) {
    BooksAPI.getAll().then(books=>{
      return cb(books); 
    })
  } 

  cacheAll =(bookArr)=> {
    let cache ={}
    let catergories = {
      currentlyReading:[],
      read:[],
      wantToRead:[],
    }
    for(let book of bookArr){
      cache[book.id] = book;
      if(book.shelf === 'wantToRead'){
        catergories.wantToRead.push(book);
      }
      if(book.shelf === 'read'){
        catergories.read.push(book);
      }
      if(book.shelf === 'currentlyReading'){
        catergories.currentlyReading.push(book);
      }
    }
    this.setState(prevState =>{
      return {
        ...prevState,
        cacheByIds: cache,
        ...catergories,
      }
    })
  }
  componentWillMount() {
    this.getAllBooksOnShelves(this.cacheAll)
  }

changeShelf =(book, newShelf)=>{
  let catergories = {
    currentlyReading: this.state.currentlyReading,
    read: this.state.read,
    wantToRead: this.state.wantToRead,
  }

  if(book.shelf && book.shelf!=='none'){
    catergories[book.shelf] = catergories[book.shelf].filter(curBook=> {
      return curBook.id!== book.id
    })
  }

  book.shelf = newShelf
  catergories[newShelf].push(book)
  
  this.setState(prevState=>{
    return {
      ...prevState,
      wantToRead: catergories.wantToRead,
      read: catergories.read,
      currentlyReading: catergories.currentlyReading,
    }
  })
  return newShelf;
}

  render() {
    return (
      <div className="app">
        {/* <Route  path='/' component ={ShelfList}/> */}
        <Route  exact={true} path='/search' render={() =>
          ( 
            <Search
              search = {BooksAPI.search}
              cacheByIds ={this.state.cacheByIds}
              catergories = {this.state.catergories}
              changeShelf={this.changeShelf}
            />
          )
        }/>
        <Route  exact={true} path='/' render={() =>
          ( 
            <Shelves
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              changeShelf={this.changeShelf}
            />
          )
        }/>
      </div>
    )
  }
}

export default BooksApp
