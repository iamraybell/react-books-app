import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Search } from './components/search';
import { Book } from './components/book';


class BooksApp extends React.Component {
  state = {
    cacheByIds:{},
    catergories:{
      currentlyReading:[],
      read:[],
      wantToRead:[],
    }
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
        console.log('shelf match')
        catergories.currentlyReading.push(book);
      }
    }
    this.setState(prevState =>{
      return {
        ...prevState,
        cacheByIds: cache,
        catergories: catergories,
      }
    })
  }
  componentWillMount() {
    this.getAllBooksOnShelves(this.cacheAll)
  }


  render() {
    return (
      <div className="app">
        {/* <Route  path='/' component ={ShelfList}/> */}
        <Route  path='/search' render={() =>
          (
            <Search
              search = {BooksAPI.search}
              cacheByIds ={this.state.cacheByIds}
              catergories = {this.state.catergories}
            />
          )
        }/>
      </div>
    )
  }
}

export default BooksApp
