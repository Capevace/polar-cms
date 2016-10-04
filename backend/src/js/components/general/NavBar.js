import React from 'react';
import NavLink from './NavLink';

const NavItem = ({ title, path, active }) => {
  const activeClass = active ? 'active' : '';

  return (
    <li className={`nav-item ${activeClass}`}>
      <NavLink className="nav-link" path={path}>{title}</NavLink>
    </li>
  );
};

const NestedNavItem = ({ title, items = [] }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title}
      </a>
      <div className="dropdown-menu">
        {items.map((item, index) => {
          return <NavLink className="dropdown-item" path={item.path}>{item.title}</NavLink>;
        })}
      </div>
    </li>
  );
};

const NavBar = ({
  items = [],
  collapses = false,
  large = false,
  dark = false,
  bgColor = 'bg-faded',
  brand = false
}) => {
  const id = `#navbar-collapse-${Math.floor(Math.random() * 1000)}`;
  const collapseClass = collapses ? 'collapse navbar-toggleable-xs' : '';
  const largeClass = large ? 'navbar-large' : '';
  const darkClass = dark ? 'navbar-dark' : 'navbar-light';

  return (
    <nav className={`navbar ${darkClass} ${largeClass} ${bgColor}` }>

      { collapses &&
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target={id} aria-controls={id} aria-expanded="false" aria-label="Toggle navigation">
          &#9776;
        </button>
      }

      <div className={`${collapseClass} text-xs-center`} id={id}>
        {
          brand &&
          <a className="navbar-brand" href="#">{brand}</a>
        }

        <ul className="nav navbar-nav">
          {items.map((item, index) => {
            if (item.type === 'dropdown') {
              return <NestedNavItem title={item.title} items={item.items} />
            } else {
              return <NavItem title={item.title} path={item.path} active={item.active || false}/>;
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

const NavBar2 = ({ postTypes }) => {
  return (
    <nav className="navbar navbar-dark navbar-large bg-primary-faded">
      <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-controls="exCollapsingNavbar2" aria-expanded="false" aria-label="Toggle navigation">
        &#9776;
      </button>
      <div className="collapse navbar-toggleable-xs text-xs-center" id="exCollapsingNavbar2">
        <a className="navbar-brand" href="#">Polar CMS</a>
        <ul className="nav navbar-nav">


          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

// {/* <nav className='navbar-top'>
//   <ul>
//     <li className='nav-item'><Navigate path='/'>Home</Navigate></li>
//     <li className='nav-item'>
//       <a>Posts</a>
//       <ul className=''>
//         {Object.keys(postTypes).map((typeKey, index) => {
//           const type = postTypes[typeKey];
//           return <li key={index}><Navigate path={`/posts/${type.slug}`}>{type.name}</Navigate></li>;
//         })}
//       </ul>
//     </li>
//   </ul>
// </nav> */}
