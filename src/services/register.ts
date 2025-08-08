import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  message: string;
}

const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await axios.post("/api/register", payload);
  return data;
};

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data.message);
      navigate("/login");
    },
  });
}
