import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Button from "@src/components/ui/Button";
import Card from "@src/components/ui/Card";
import Input from "@src/components/ui/Input";
import {
  resetSchema,
  type resetFormData,
} from "@src/components/schema/resetSchema";
import { ZodError } from "zod";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<resetFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<resetFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      resetSchema.parse(formData);
      navigate("/login");
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<resetFormData> = {};
        err.issues.forEach((error) => {
          const fieldName = error.path[0] as keyof resetFormData;
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
          <h2 className="card-title">Reset Password</h2>
          <p>Please enter your new password details.</p>

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
                placeholder="Enter new password"
                className="input-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="input-primary"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="btn-primary">
              Reset Password
            </Button>
            <div>
              Remembered your password?
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
