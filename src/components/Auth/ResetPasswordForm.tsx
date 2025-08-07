import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function ResetPasswordForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="card-border">
        <div className="card-body">
          <h2 className="card-title">Reset Password</h2>
          <p>Please enter your email and new password.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input-primary"
            />
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              required
              className="input-primary"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              required
              className="input-primary"
            />
            <Button type="submit" className="btn-primary">
              Reset Password
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
