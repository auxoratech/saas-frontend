import { useAuthContext } from "@src/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post("/api/login", payload);
  return data;
};

export function useLogin() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.token);
      navigate("/dashboard");
    },
  });
}
