import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
  description: "Atedoz Space Admin Dashboard Sign Up",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
