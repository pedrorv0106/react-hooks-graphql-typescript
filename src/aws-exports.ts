export default {
  Auth: {
    region: process.env.REACT_APP_AUTH_REGION,
    userPoolId: process.env.REACT_APP_AUTH_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_WEB_CLIENT_ID,
    mandatorySignIn: false,
  },
};
