import { useState } from "react";
import { Link } from "react-router";
import Button from "@src/components/ui/Button";
import Card from "@src/components/ui/Card";
import Input from "@src/components/ui/Input";
import { loginSchema } from "@src/components/schema/loginSchema";
import type { LoginFormData } from "@src/components/schema/loginSchema";
import { ZodError } from "zod";
import { useLogin } from "@src/services/login";

export default function LoginForm() {
  const loginMutation = useLogin();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      loginSchema.parse(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<LoginFormData> = {};
        err.issues.forEach((error) => {
          const fieldName = error.path[0] as keyof LoginFormData;
          fieldErrors[fieldName] = error.message;
        });
        setErrors(fieldErrors);
      }
      return;
    }
    loginMutation.mutate(formData, {
      onError: () => {
        setErrors({ email: "Login failed. Please check your credentials." });
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="card-border">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>Please enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="input-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="input-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn-primary"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
            <div>
              Don't have an account?
              <Link to="/register">
                <Button type="button" className="btn-secondary btn-sm ml-2">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div>
              Forgot your password?
              <Link to="/reset-password">
                <Button type="button" className="btn-warning btn-sm ml-2">
                  Reset Password
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
