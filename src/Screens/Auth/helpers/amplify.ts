import { Auth } from 'aws-amplify';

export const startRegister = async ({ userInfo, attributes }: any) => {
  const { email, password } = userInfo;
  return Auth.signUp({
    username: email,
    password,
    attributes,
  }).catch((error) => ({ error }));
};

export const startLogin = async ({ email, password }: any) => {
  return Auth.signIn({
    username: email,
    password,
  }).catch((error) => ({ error }));
};

export const startLogout = async () => {
  return Auth.signOut().catch((error) => ({ error }));
};

export const startRecoveryPassword = async ({ email }: any) => {
  return Auth.forgotPassword(email).catch((error) => ({ error }));
};

export const endRecoveryPassword = async (
  email: string,
  code: string,
  password: string
) => {
  return Auth.forgotPasswordSubmit(email, code, password).catch((error) => ({
    error,
  }));
};

export const verifyEmail = async (email: string, code: string) =>
  Auth.confirmSignUp(email, code).catch((error) => ({ error }));

export const GetToken = async () =>
  (await Auth.currentSession()).getIdToken().getJwtToken();

export const requestCode = async (email: string) =>
  Auth.resendSignUp(email).catch((error) => ({ error }));
