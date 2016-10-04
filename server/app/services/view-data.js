/* eslint no-param-reassign: off */

export function combineViewData(req, otherViewData = {}) {
  return Object.assign(
    {},
    req.viewData || {},
    otherViewData
  );
}

export function viewDataMiddleware() {
  return (req, res, next) => {
    req.viewData = {
      data: true,
    };

    next();
  };
}
