import types from './types/types';

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.login:
      return {
        uuid: action.payload.uuid,
        userName: action.payload.userName,
        email: action.payload.email,
        sesionStatus: true,
      };

    case types.recoveryPassword:
      return {
        email: action.payload.email,
        isRecoveredPassword: true,
      };

    case types.logout:
      return {
        sesionStatus: false,
      };

    case types.sesionStatus:
      return {
        ...state,
        sesionStatus: false,
      };

    case types.uiShowLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiHideLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state || {};
  }
};

export default authReducer;
