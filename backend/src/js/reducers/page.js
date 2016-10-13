const initialState = {
  pageTitle: 'Page Title',
};

function page(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_PAGE_TITLE':
      return { ...state, pageTitle: action.pageTitle };
    default:
      return state;
  }
}

export default page;
