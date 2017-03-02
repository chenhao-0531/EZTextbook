/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import { AppRegistry, View } from 'react-native';
 import Header from './src/components/Header';
 import BookList from './src/components/BookList';

 const EZTextbook = () => (
   <View style={{ flex: 1 }}>
     <Header headerText={'Search Books'} />
     <BookList />
   </View>
 );

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
