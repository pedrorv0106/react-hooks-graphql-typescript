import types from './Types/types';

const baseState = {
  avgRating: 0,
};

const ownerReducer = (state: any = baseState, action: any) => {
  switch (action.type) {
    case types.UPDATE_RATING:
      return {
        ...state,
        avgRating: action.payload.avgRating,
      };

    default:
      return state || {};
  }
};

export default ownerReducer;
