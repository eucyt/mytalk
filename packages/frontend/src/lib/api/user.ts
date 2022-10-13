import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL ?? "http://localhost:3000";

// eslint-disable-next-line @typescript-eslint/naming-convention
const headers = { "Content-Type": "application/json" };

const userAPI = {
  login: async (email: string, password: string): AxiosPromise => {
    return (await axios
      .post(`${SERVER_BASE_URL}/auth/login`, { email, password }, { headers })
      .catch((error: AxiosError) => {
        return error.response;
      })) as AxiosResponse;
  },
  register: async (
    displayName: string,
    email: string,
    password: string
  ): AxiosPromise => {
    return await axios.post(
      `${SERVER_BASE_URL}/auth/register`,
      { displayName, email, password },
      { headers }
    );
  },
  isAuthenticated: async (): Promise<boolean> => {
    try {
      if (window.localStorage.getItem("accessToken") === null) {
        return false;
      }
      const accessToken = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        window.localStorage.getItem("accessToken")!
      ) as string;
      const { status } = await axios.get(`${SERVER_BASE_URL}/auth`, {
        headers: { ...headers, accessToken },
      });
      return status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default userAPI;
