import React, { PropTypes } from 'react';

export const Table = ({ children, headers, footers }) => (
  <table className="table">
    {headers &&
      <thead>
        <tr>
          {headers.map((head, index) => <th key={index}>{head}</th>)}
        </tr>
      </thead>
    }

    <tbody>
      {children}
    </tbody>

    {footers &&
      <tfoot>
        <tr>
          {footers.map((foot, index) => <th key={index}>{foot}</th>)}
        </tr>
      </tfoot>
    }
  </table>
);

Table.propTypes = {
  children: PropTypes.any,
  headers: PropTypes.arrayOf(PropTypes.string),
  footers: PropTypes.arrayOf(PropTypes.string),
};

export const TableLoading = ({ loading }) => {
  if (loading) {
    return <p>Loading</p>;
  }

  return null;
};

TableLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.any,
};

export const TableCol = ({ children }) => (
  <td>
    {children}
  </td>
);

TableCol.propTypes = {
  children: PropTypes.any,
};
