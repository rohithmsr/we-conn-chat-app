export const getGroupChatNames = (people, currentUsername) => {
  return (
    '@' +
    people.map(p => p.person.username).find(un => un !== currentUsername) +
    `, +${people.length - 1}`
  );
};
