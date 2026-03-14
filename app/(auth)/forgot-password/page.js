// SignInPage.jsx
"use client";

import React, { useState } from "react";
import { AuthFormShell, Button, Input } from "@/components";
import { useAuth } from "@/context";
import Link from "next/link";

const HEADER = {
  title: "Forgot Password",
  subtitle: "Reset your Password",
};

const footer = (
  <>
    Remember your password?{" "}
    <Link href="/sign-in" className="text-blue-400 hover:underline">
      Sign in
    </Link>
  </>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword, error } = useAuth();

  const disableButton = !email.length || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      header={HEADER}
      footer={footer}
      error={error}
      onSubmit={handleSubmit}
    >
      <Input
        label="E-Mail"
        type="email"
        placeholder="E-Mail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button disabled={disableButton}>Reset Password</Button>
    </AuthFormShell>
  );
}
