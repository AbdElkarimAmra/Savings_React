

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const INTAKE_API = `${API_BASE}/api/user-finances/intake`;
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";


// Simplified MVP version — orange and white theme
export default function UserInfo() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      lastPaycheckCents: "",
      currentBalanceCents: "",
      savedToGoalCents: "",
      needsMonthlyCents: "",
      wantsMonthlyCents: "",
      housingCents: "",
      foodGroceriesCents: "",
      transportCents: "",
      utilitiesCents: "",
      insuranceHealthCents: "",
      personalShoppingCents: "",
      entertainmentEatingOutCents: "",
      subscriptionsCents: "",
      miscFunCents: "",
      emergencyShortTermCents: "",
      longTermInvestingDebtCents: "",
    },
  });


  async function onSubmit(values) {
  console.log("User finances (frontend):", values);

  const token = Cookies.get("token");
  if (!token) {
    toast.error("You must be logged in first.");
    return;
  }

  try {
    const res = await fetch(INTAKE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error response:", data);
      toast.error(data?.message || "Something went wrong. Please try again.");
      return;
    }

    toast.success("Your financial info has been saved successfully ✅");
    console.log("RESPONSE:", data);
    console.log("VALUES:", values);
    console.log("TOKEN:", token);
    navigate("/dashboard");
  } catch (err) {
    console.error("Fetch error:", err);
    toast.error("Network error. Please try again later.");
  }
}
  
   return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg border-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="lastPaycheckCents" className="text-gray-700">
                Last Paycheck (Cents)
              </Label>
              <Input
                {...register("lastPaycheckCents", { required: true })}
                id="lastPaycheckCents"
                type="number"
                placeholder="e.g. 1120000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentBalanceCents" className="text-gray-700">
                Current Balance (Cents)
              </Label>
              <Input
                {...register("currentBalanceCents", { required: true })}
                id="currentBalanceCents"
                type="number"
                placeholder="e.g. 50000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="savedToGoalCents" className="text-gray-700">
                Saved to Goal (Cents)
              </Label>
              <Input
                {...register("savedToGoalCents")}
                id="savedToGoalCents"
                type="number"
                placeholder="e.g. 20034300"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="needsMonthlyCents" className="text-gray-700">
                Needs Monthly (Cents)
              </Label>
              <Input
                {...register("needsMonthlyCents", { required: true })}
                id="needsMonthlyCents"
                type="number"
                placeholder="e.g. 100000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="wantsMonthlyCents" className="text-gray-700">
                Wants Monthly (Cents)
              </Label>
              <Input
                {...register("wantsMonthlyCents", { required: true })}
                id="wantsMonthlyCents"
                type="number"
                placeholder="e.g. 40000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="housingCents" className="text-gray-700">
                Housing (Cents)
              </Label>
              <Input
                {...register("housingCents")}
                id="housingCents"
                type="number"
                placeholder="e.g. 50000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="foodGroceriesCents" className="text-gray-700">
                Food & Groceries (Cents)
              </Label>
              <Input
                {...register("foodGroceriesCents")}
                id="foodGroceriesCents"
                type="number"
                placeholder="e.g. 15000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="transportCents" className="text-gray-700">
                Transport (Cents)
              </Label>
              <Input
                {...register("transportCents")}
                id="transportCents"
                type="number"
                placeholder="e.g. 10043424343200"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="utilitiesCents" className="text-gray-700">
                Utilities (Cents)
              </Label>
              <Input
                {...register("utilitiesCents")}
                id="utilitiesCents"
                type="number"
                placeholder="e.g. 5000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="insuranceHealthCents" className="text-gray-700">
                Health Insurance (Cents)
              </Label>
              <Input
                {...register("insuranceHealthCents")}
                id="insuranceHealthCents"
                type="number"
                placeholder="e.g. 2000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="personalShoppingCents" className="text-gray-700">
                Personal Shopping (Cents)
              </Label>
              <Input
                {...register("personalShoppingCents")}
                id="personalShoppingCents"
                type="number"
                placeholder="e.g. 3000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="entertainmentEatingOutCents" className="text-gray-700">
                Entertainment / Eating Out (Cents)
              </Label>
              <Input
                {...register("entertainmentEatingOutCents")}
                id="entertainmentEatingOutCents"
                type="number"
                placeholder="e.g. 4000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subscriptionsCents" className="text-gray-700">
                Subscriptions (Cents)
              </Label>
              <Input
                {...register("subscriptionsCents")}
                id="subscriptionsCents"
                type="number"
                placeholder="e.g. 154343200"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="miscFunCents" className="text-gray-700">
                Misc Fun (Cents)
              </Label>
              <Input
                {...register("miscFunCents")}
                id="miscFunCents"
                type="number"
                placeholder="e.g. 3500"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyShortTermCents" className="text-gray-700">
                Emergency / Short-term (Cents)
              </Label>
              <Input
                {...register("emergencyShortTermCents")}
                id="emergencyShortTermCents"
                type="number"
                placeholder="e.g. 1243432000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="longTermInvestingDebtCents" className="text-gray-700">
                Long-term Investing / Debt (Cents)
              </Label>
              <Input
                {...register("longTermInvestingDebtCents")}
                id="longTermInvestingDebtCents"
                type="number"
                placeholder="e.g. 10000"
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              
              className="w-full bg-[#F46B2E] hover:bg-[#e45e23] text-white font-semibold transition-all"
            >
              Save and Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </main>
  );
}

