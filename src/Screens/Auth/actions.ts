import types from './types/types';

export const login = (uuid: string, userName: string, email: string) => {
  return {
    type: types.login,
    payload: {
      uuid,
      userName,
      email,
    },
  };
};

export const resetPassword = (email: string) => {
  return {
    type: types.recoveryPassword,
    payload: {
      email,
      isRecoveredPassword: true,
    },
  };
};

export const closeSesionStatus = () => {
  return {
    type: types.sesionStatus,
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
