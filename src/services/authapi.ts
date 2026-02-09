const BASE_URL = "https://dummyjson.com";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json();
};
