import { useNavigate } from "react-router";
import { Link } from "react-router";
import Button from "../ui/button";
import Card from "../ui/Card";
import Input from "../ui/Input";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="card-border">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>Please enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="input-primary"
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="input-primary"
            />
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
