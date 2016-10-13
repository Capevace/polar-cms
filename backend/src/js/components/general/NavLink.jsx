import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { join } from 'path';

// export function navigate(path) {
//   browserHistory.push(join('/dashboard', path));
// }
//

function NavLink({ className, children, path }) {
  const fullPath = join('/dashboard', path);

  return (
    <Link className={className} to={fullPath}>
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  path: PropTypes.string.isRequired,
};

export default NavLink;
