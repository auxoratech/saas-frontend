import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    navigate("/dashboard");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="btn-primary">
              Login
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
