import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@src/components/ui/Button";
import Card from "@src/components/ui/Card";
import Input from "@src/components/ui/Input";
import { Link } from "react-router";
import { registerSchema } from "../schema/registerSchema";
import { ZodError } from "zod";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      registerSchema.parse(formData);
      navigate("/login");
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<typeof formData> = {};
        err.issues.forEach((error) => {
          const fieldName = error.path[0] as keyof typeof formData;
          fieldErrors[fieldName] = error.message;
        });
        setErrors(fieldErrors);
      }
      return;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="card-border">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <p>Please fill out the form to create a new account.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-primary"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-primary"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-primary"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
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
