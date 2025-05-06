import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Atedoz Space Admin Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
