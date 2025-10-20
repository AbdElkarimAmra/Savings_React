import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

  async function onSubmit(values) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }),
        }
      );

    
     const data = await res.json();
   

      // If your API returns { token }, store it (less safe than HttpOnly cookie).
     

        toast.success("Account created! Welcome to SHAK 🎉", {
        description: "Click to go to the login page.",
        duration: 6000,
        action: {
            label: "Log in",
            onClick: () => navigate("/login"),
        },
        });
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Network error — please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
      <Card className="w-full max-w-sm shadow-lg border-0 bg-white rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-[#F46B2E]">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Join SHAK and start saving smarter today.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-2 text-left">
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Your first name"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
                {...register("firstName", { required: "First name is required" })}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Your last name"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
                {...register("lastName", { required: "Last name is required" })}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                aria-invalid={!!errors.password}
              />
              <div className="flex items-center gap-2">
                <input
                  id="showPw"
                  type="checkbox"
                  onChange={(e) => setShowPw(e.target.checked)}
                />
                <Label htmlFor="showPw" className="text-sm text-gray-600">Show password</Label>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showPw ? "text" : "password"}
                placeholder="Re-enter password"
                autoComplete="new-password"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) =>
                    v === passwordValue || "Passwords do not match",
                })}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F46B2E] hover:bg-[#e45e23] text-white font-semibold transition-all disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F46B2E] font-medium hover:underline">
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
