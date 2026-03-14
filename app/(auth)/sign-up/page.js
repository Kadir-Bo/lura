"use client";

import React, { useState } from "react";
import { AuthFormShell, Button, Input } from "@/components";
import { useAuth } from "@/context";
import Link from "next/link";

const HEADER = {
  title: "Create Account",
  subtitle: "Create a new account",
};

const footer = (
  <>
    Already have an account?{" "}
    <Link href="/sign-in" className="text-blue-400 hover:underline">
      Sign in
    </Link>
  </>
);

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, error } = useAuth();

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const disableButton =
    !email.length ||
    !password.length ||
    !confirmPassword.length ||
    passwordMismatch ||
    loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMismatch) return;
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (err) {
      console.error("Registration error:", err);
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
        label="Email"
        value={email}
        type="email"
        placeholder="example@mail.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        error={passwordMismatch ? "Passwords do not match" : undefined}
      />
      <Button disabled={disableButton} className="mt-4">
        Sign Up
      </Button>
    </AuthFormShell>
  );
}
