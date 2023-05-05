import { cookies } from "next/dist/client/components/headers";

//create a fetch wrapper function wich mask the real fetch function
export async function sessionFetch(
  url: RequestInfo | URL,
  options?: RequestInit
) {
  const cookieStr = cookies()
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const injectedOptions = {
    ...(options ?? {}),
    headers: {
      ...options?.headers,
      cookie: cookieStr,
    },
  };

  return fetch(url, injectedOptions);
}
