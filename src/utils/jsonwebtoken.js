const ManualJsonWebTokenCreator = async (user) => {
  const base64Encode = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
  };

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 3600, // Token expires in 1 hour
  };

  const secret = import.meta.env.VITE_SECRET; // Secret key to sign the token (in real-world, keep this secure)

  const encodedHeader = base64Encode(JSON.stringify(header));
  const encodedPayload = base64Encode(JSON.stringify(payload));

  // Create signature (simple example, not secure like in the server)
  const signature = base64Encode(encodedHeader + encodedPayload + secret);

  // Combine all parts to form the JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`;
  //   return user;
};

export default ManualJsonWebTokenCreator;
