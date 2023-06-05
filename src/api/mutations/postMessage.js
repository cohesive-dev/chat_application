import { useMutation } from "react-query";

export const usePostMessage = ({ message }) => {
  return useMutation(
    async () => await registerUser({
      accessToken,
      userName,
      userId,
      encryptedMessage
    }),
    {
      ...options,
      onSettled: () => queryClient.invalidateQueries(getFullUserAccessQueryKey({ userId, accessToken }))
    }
  );
};
