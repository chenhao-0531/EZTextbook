import React, { Component } from 'react';
import { ScrollView } from 'react-native';
//import axios from 'axios';
import BookDetail from './BookDetail';
import Books from './Books.json';

class BookList extends Component {
  state = { Books };
  renderBooks() {
    return this.state.Books.map(book =>
      <BookDetail key={book.title} book={book} />
    );
  }
  render() {
    return (
      <ScrollView>
        {this.renderBooks()}
      </ScrollView>
    );
  }
}

// Make the component available to other parts of the app
export default BookList;
