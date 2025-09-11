export const removeToken = async () => {
  try {
    await fetch('/api/users/logout', { method: 'POST' });
  } catch (error) {
    console.error("Logout failed", error);
  }
};
