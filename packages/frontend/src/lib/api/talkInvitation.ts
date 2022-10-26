import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";

const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:3000";

// eslint-disable-next-line @typescript-eslint/naming-convention
const headers = { "Content-Type": "application/json" };

const talkInvitationAPI = {
  inviteToTalkNotCreated: async (
    accessToken: string,
    inviteeEmail: string
  ): AxiosPromise => {
    return (await axios
      .post(
        `${SERVER_BASE_URL}/talk-invitations`,
        { inviteeEmail: inviteeEmail },
        {
          headers: {
            ...headers,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error: AxiosError) => {
        return error.response;
      })) as AxiosResponse;
  },

  getInvitedInvitations: async (accessToken: string): AxiosPromise => {
    return (await axios
      .get(`${SERVER_BASE_URL}/talk-invitations/invited`, {
        headers: {
          ...headers,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response;
      })) as AxiosResponse;
  },

  accept: async (accessToken: string, invitationId: number): AxiosPromise => {
    return (await axios
      .post(
        `${SERVER_BASE_URL}/talk-invitations/${invitationId}/accept`,
        {},
        {
          headers: {
            ...headers,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error: AxiosError) => {
        return error.response;
      })) as AxiosResponse;
  },
};
export default talkInvitationAPI;
