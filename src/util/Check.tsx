export const isParticipant = (participants: [], username: string) => {
  let check = false;
  participants.forEach((participant) => {
    if (participant.name === username) {
      check = true;
    }
  });
  return check;
};
