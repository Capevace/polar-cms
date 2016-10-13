import React from 'react';

export default function withProps(WrappedComponent, passedProps) {
  function WithProps(props) {
    return <WrappedComponent {...props} {...passedProps} />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithProps.displayName = `withProps(${wrappedComponentName})`;

  return WithProps;
}
