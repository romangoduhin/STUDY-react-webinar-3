const initialState = {
  data: [],
  count: 0,
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], count: 0, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "article/load-error":
      return {...state, data: [], count: 0, waiting: false};

    default:
      return state;
  }
}

export default reducer;
