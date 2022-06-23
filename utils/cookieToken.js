const cookieToken = (user) => {
  const token = user.generateAccessToken(user.id);
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return { token, options };
};

module.exports = cookieToken;