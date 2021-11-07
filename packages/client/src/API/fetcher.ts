import { getCookie } from "../utils/cookies";

export function fetcher(
  path: string,
  options: RequestInit = {},
  auth: boolean = false
) {
  return fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
    headers: {
      ...(auth && { Authorization: `Bearer ${getCookie("__session")}` }),
    },
    ...options,
  });
}
