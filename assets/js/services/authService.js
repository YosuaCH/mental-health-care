const API_URL = "http://localhost:8080/auth";

export const login = async (email, password) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const registerClient = async (data) => {
  return fetch(`${API_URL}/register/client`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const registerPsikiater = async (data) => {
  return fetch(`${API_URL}/register/psikiater`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
