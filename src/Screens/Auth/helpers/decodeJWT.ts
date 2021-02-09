import JWTDecode from 'jwt-decode';

const jwtDecode = (jwt: string) => {
  const userData: any = JWTDecode(jwt);
  const {
    email,
    sub,
    family_name: familyName,
    given_name: givenName,
  } = userData;
  const uuid = userData['custom:uuid'] || sub;
  const userName = `${givenName}  ${familyName}`;
  return {
    userData,
    uuid,
    userName,
    email,
  };
};

export default jwtDecode;
