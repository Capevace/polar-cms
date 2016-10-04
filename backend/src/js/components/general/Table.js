import React from 'react';

export const Table =  ({ children, headers, footers }) => (
  <table className="table">
    {
      headers && (
        <thead>
          <tr>
          {
            headers.map(head => <th>{head}</th>)
          }
          </tr>
        </thead>
      )
    }
    <tbody>
      {children}
    </tbody>
    {
      footers && (
        <tfoot>
          <tr>
          {
            footers.map(foot => <th>{foot}</th>)
          }
          </tr>
        </tfoot>
      )
    }
  </table>
);

export const TableLoading = ({ loading }) => {
  if (loading) {
    return <p>Loading</p>
  }

  return null;
};

export const TableRow = ({ children }) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

export const TableCol = ({ children }) => {
  return (
    <td>
      {children}
    </td>
  );
};
