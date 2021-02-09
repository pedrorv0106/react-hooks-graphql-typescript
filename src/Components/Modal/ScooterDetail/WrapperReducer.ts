import { SHOW_SCOOTER_DETAIL, HIDE_SCOOTER_DETAIL } from './WrapperConstants';

const initialState = {
    show: false
};

const WrapperReducer = (state = initialState, action: any) => {
    const { type } = action;

    switch (type) {
        case SHOW_SCOOTER_DETAIL:
            return {
                show: true
            };
        case HIDE_SCOOTER_DETAIL:
            return {show: false};
        default:
            return state;
    }
};

export default WrapperReducer;