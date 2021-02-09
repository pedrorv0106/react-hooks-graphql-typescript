import types from './Types/types';

export const updateRating = (avgRating = 0) => {
  return {
    type: types.UPDATE_RATING,
    payload: {
      avgRating,
    },
  };
};