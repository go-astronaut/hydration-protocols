/**
 * get headers object based on token string
 */
function getHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

export { getHeaders };
