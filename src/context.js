import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//needs a Provider that supplies the information
// and also a Consumer that uses the information
// this avoids prop drilling


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: true,
        modalProduct: detailProduct,
    };
    setProducts = () => {
        let tempProducts = [];                                     // loops through the store products list and gets all the values
        storeProducts.forEach(item => {                             // making sure to get a copy of the values and not a actual
            const singleItem = {...item };                          // reference to the values so that when a change is done it doesnt 
            tempProducts = [...tempProducts, singleItem];           // affect our actual data, so a individual user cant change our data by interacting with the app
        })
        this.setState(() => {
            return { products: tempProducts }
        });
    }
    componentDidMount() {
        this.setProducts();
    }

    getItem = (id)=> {
        const product = this.state.products.find(item => item.id === id);
            return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct: product};
        });
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products: tempProducts, cart:[...this.state.cart, product]}
        }, ()=> console.log(this.state.cart)); // for debuging to make sure item is added to cart
   
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalproduct: product,modalOpen:true}
        })
    }

    closeModal = ()=>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    render() {
        return ( <ProductContext.Provider value = {
                {...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal} } > { this.props.children } 
                </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };