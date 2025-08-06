import { useNavigate } from "react-router";
import Button from "../ui/button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import { Link } from "react-router";

export default function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const firstName = formData.get("firstName") as string;
    // const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="card-border">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <p>Please fill out the form to create a new account.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input
              type="email"
              name="email"
              value="Client@gmail.com" // auto filled
              placeholder="Enter email"
              required
              className="input-primary"
            />
            <Input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              required
              className="input-primary"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Enter last name"
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
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              className="input-primary"
            />
            <Button type="submit" className="btn-primary">
              Register
            </Button>
            <div>
              Already have an account?
              <Link to="/login">
                <Button type="button" className="btn-secondary btn-sm ml-2">
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
