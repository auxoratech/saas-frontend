import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ResetPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetResponse {
  message: string;
}

const resetPassword = async (payload: ResetPayload): Promise<ResetResponse> => {
  const { data } = await axios.post("/api/reset-password", payload);
  return data;
};

export function useReset() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log(data.message);
      navigate("/login");
    },
  });
}
