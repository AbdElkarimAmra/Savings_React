import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


export default function Homepage() {

  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { values }} = useForm({
    email: "",
    password: "",
  });

    async function handleLogin(values) {
        
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });

        if (res.ok) {
        toast("Login successful!");
        const data = await res.json();
        Cookies.set("token", data.token);
        // navigate("/options");  
        }

        if (!res.ok) {
          toast("Login failed! Please chec your credentials and try again.");
        }
        
    }
  function onSubmit(value) {
    
    handleLogin(value);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-4">
      <h1 className="text-4xl font-bold mb-3 text-[#F46B2E]">Welcome to SHAK 💸</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl italic">
        "Do not save what is left after spending, but spend what is left after saving." 
        <br />– Warren Buffett
      </p>

      <Card className="w-full max-w-md shadow-xl border-0 bg-white rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-[#F46B2E]">Log In</CardTitle>
          <CardDescription className="text-gray-600">
            Log in and start your saving journey
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Link
                  to={"/signup"}
                  className="text-sm text-[#F46B2E] font-medium hover:underline"
                >
                  Don’t have an account? Sign Up
                </Link>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#F46B2E] hover:bg-[#e45e23] text-white font-semibold transition-all"
            >
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
      

    </main>
  );
}
