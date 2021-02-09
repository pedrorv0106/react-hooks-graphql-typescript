export const SHOW_SCOOTER_DETAIL = "SHOW/SCOOTER_DETAIL";
export const HIDE_SCOOTER_DETAIL = "HIDE/SCOOTER_DETAIL";

export const hideModalAction = () => {
  return {
    type: HIDE_SCOOTER_DETAIL,
  };
};

export const showModalAction = () => {
  return {
    type: SHOW_SCOOTER_DETAIL,
  };
};