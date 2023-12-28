import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import {Provider} from 'react-redux';
import ShoppingList from './components/ShoppingList';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from "./actions/authActions";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
  return (
    <Provider store ={store}>
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  </Provider>
  );
}}

export default App;
