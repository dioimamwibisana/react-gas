import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
  render(){
    return(
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink exact to="/about">About</NavLink>
        </li>
      </ul>
    )
  }
}

export default Header;
