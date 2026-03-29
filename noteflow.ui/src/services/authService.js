export const register = async (username, email, password) => {
  const response = await fetch("http://localhost:5115/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка регистрации");
  }

  return response.text();
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost:5115/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.text();
};