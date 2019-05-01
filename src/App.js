import React from 'react';
import {Switch,Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Product from './components/Product';
import Modal from './components/Modal';

//this page is solely for rendering the different components there will be no logic here, routing is handled by react-router-dom, which the parent is in index.js
function App() {
  return (
    <React.Fragment>
        <NavBar></NavBar>
        <Switch>
          <Route exact path='/' component={ProductList}></Route>
          <Route path='/details' component={Details}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/store'component={Product}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal />
    </React.Fragment>
  );
}


export default App;
