export const generateInviteCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let inviteCode = "";

  for (let i = 0; i < 8; i++) {
    inviteCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return inviteCode;
};
