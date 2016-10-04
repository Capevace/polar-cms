import React from 'react';
import { Link } from 'react-router';
import { join } from 'path';

// export function navigate(path) {
//   browserHistory.push(join('/dashboard', path));
// }
//
export default ({ className, children, path }) => {
  const fullPath = join('/dashboard', path);

  return (
    <Link
      className={className}
      to={fullPath}
    >
      {children}
    </Link>
  )
}
