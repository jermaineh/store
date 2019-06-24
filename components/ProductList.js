import React, { Component } from 'react';
import Product from './Product.js';
import Title from './Title';

import {ProductConsumer} from '../context';

class ProductList extends Component {
    
    render() {
       
        return (
            <React.Fragment>
            <div className="py-5 container-fluid">
              <div className="container">
              <Title name='E-' title='Commerce'></Title>
                <div className="row">
                   <ProductConsumer>
                       {(value)=>{
                           return value.products.map(product => {
                               return <Product key={product.id} product={product} />
                            });
                       }}
                       </ProductConsumer> 
                </div>
              </div>
            </div>
                
            </React.Fragment>

        );
    }
}

export default ProductList;