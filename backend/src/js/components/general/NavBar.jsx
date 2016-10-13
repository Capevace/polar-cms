import React, { PropTypes } from 'react';
import NavLink from './NavLink';

const NavItem = ({ title, path, active }) => (
  <li className={`nav-item ${active ? 'active' : ''}`}>
    <NavLink className="nav-link" path={path}>{title}</NavLink>
  </li>
);

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

const NestedNavItem = ({ title, items = [] }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        // href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title}
      </a>
      <div className="dropdown-menu">
        {items.map((item, index) => (
          <NavLink
            key={index}
            className="dropdown-item"
            path={item.path}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </li>
  );
};

NestedNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
};

const NavBar = ({
  items = [],
  collapses = false,
  large = false,
  dark = false,
  bgColor = 'bg-faded',
  brand = false,
}) => {
  const id = `#navbar-collapse-${Math.floor(Math.random() * 1000)}`;
  const collapseClass = collapses ? 'collapse navbar-toggleable-xs' : '';
  const largeClass = large ? 'navbar-large' : '';
  const darkClass = dark ? 'navbar-dark' : 'navbar-light';

  return (
    <nav className={`navbar ${darkClass} ${largeClass} ${bgColor}`}>

      {collapses &&
        <button
          className="navbar-toggler hidden-sm-up"
          type="button"
          data-toggle="collapse"
          data-target={id}
          aria-controls={id}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>
      }

      <div className={`${collapseClass} text-xs-center`} id={id}>
        {
          brand &&
            <a className="navbar-brand">{brand}</a>
        }

        <ul className="nav navbar-nav">
          {items.map((item, index) => {
            if (item.type === 'dropdown') {
              return (
                <NestedNavItem
                  key={index}
                  title={item.title}
                  items={item.items}
                />
              );
            }
            return (
              <NavItem
                key={index}
                title={item.title}
                path={item.path}
                active={item.active || false}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  items: PropTypes.array,
  collapses: PropTypes.bool,
  large: PropTypes.bool,
  dark: PropTypes.bool,
  brand: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  bgColor: PropTypes.string,
};

export default NavBar;
