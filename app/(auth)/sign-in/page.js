// SignInPage.jsx
"use client";

import React, { useState } from "react";
import { AuthFormShell, Button, Input } from "@/components";
import { useAuth } from "@/context";
import Link from "next/link";

const HEADER = {
  title: "Sign In",
  subtitle: "Sign in with your account",
};

const footer = (
  <>
    <Link
      href="/forgot-password"
      className="block mb-2 text-neutral-400 hover:underline"
    >
      Forgot password?
    </Link>
    Don&apos;t have an account?{" "}
    <Link href="/sign-up" className="text-blue-400 hover:underline">
      Sign up
    </Link>
  </>
);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, error } = useAuth();

  const disableButton = !email.length || !password.length || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
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
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={disableButton} className="mt-4">
        Sign In
      </Button>
    </AuthFormShell>
  );
}
