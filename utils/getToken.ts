import { parseCookies } from "nookies";

export function getToken() {
  const { "authTest.token": token } = parseCookies();

  return token;
}
