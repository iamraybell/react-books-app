import React from 'react';
import * as BooksAPI from '../BooksAPI';

export class Book extends React.Component {
    state= {
        shelf: 'None'
    }

    componentDidMount(){
        this.setState((prevState)=> {
            return {
                ...prevState,
                shelf: this.props.shelf
            }
        })
    }

    handleUpdate(newShelf){
        console.log(this.state.shelf, newShelf)
        if(this.state.shelf === newShelf){
            return;
        }
        
        BooksAPI.update({id:this.props.id},  newShelf).then((book)=>{
            this.props.changeShelf(this.props.book, newShelf) 
        }) 
    }

    render() {

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})` }}></div>
                <div className="book-shelf-changer">
                <select defaultValue={this.props.shelf} onChange={(e)=>this.handleUpdate(e.target.value)} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{ this.props.title }</div>
            <div className="book-authors">{ this.props.author }</div>
            </div>
        )

    }
}