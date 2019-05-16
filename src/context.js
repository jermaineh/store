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
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0

    };
increment = (id)=>{
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(()=>{
        return {
            cart: [...tempCart]
        }
    },()=>{this.addTotals()})
}

decrement = (id)=>{
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if(product.count === 0){
        this.removeItem(id)
    } else {
    product.total = product.count * product.price;

    this.setState(()=>{
        return {
            cart: [...tempCart]
        }
    },()=>{this.addTotals()})}
}

removeItem = (id)=>{
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(()=>{
        return{
            cart: [...tempCart],
            products: [...tempProducts],
        }
    },()=>{
        this.addTotals();
    })
}

clearCart = ()=>{
    this.setState(()=>{
        return {cart: []};
    }, ()=> {
        this.setProducts();
    })
}

addTotals = ()=>{
    let subTotal = 0;
    this.state.cart.map(item=>(subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(()=>{
        return {
            cartSubtotal: subTotal,
            cartTax: tax,
            cartTotal: total
        }
    })
}
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
        },()=>this.addTotals(), ()=> console.log(this.state.cart)); // for debuging to make sure item is added to cart
   
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
                {...this.state, 
                handleDetail: this.handleDetail, 
                addToCart: this.addToCart, 
                openModal: this.openModal, 
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                
                }} > 
                { this.props.children } 
                </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };