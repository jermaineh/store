import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import {ButtonContainer} from './Button';
import styled from 'styled-components';



class NavBar extends Component {
    render() {
         /* https://www.iconfinder.com/icons/1243689/call_phone_iconCreative Commons (Attribution 3.0 Unported);https://www.iconfinder.com/Makoto_msk */
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-light px-sm-5">
               
                <Link to='/'>
                    <img src={logo} alt='store' className='navbar-brand' />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className='navbar-item ml-5'>
                        <Link to='/' className='nav-link'> Products </Link>
                    </li>
                </ul>
                <Link to='/cart' className='ml-auto'>
                    <ButtonContainer>
                        <span className='mr-2'>
                        <i className="fab fa-opencart"></i>
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}
 const NavWrapper = styled.nav`
 background: var(--mainBlue);
 .nav-link{
     color: var(--mainWhite) !important;
     font-size: 1.3rem;
     text-transform: capitalize;
 }

 `
export default NavBar;