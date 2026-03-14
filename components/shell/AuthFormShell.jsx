"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context";

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function AuthFormShell({
  animKey = "default",
  header,
  footer,
  error,
  onSubmit,
  children,
}) {
  const { clearError } = useAuth();
  const { title, subtitle } = header;

  useEffect(() => {
    return () => clearError();
  }, [animKey]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animKey}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full p-8 border max-w-sm border-neutral-900 rounded-lg flex flex-col gap-6"
      >
        {title && (
          <div className="w-full">
            <h2 className="text-2xl">{title}</h2>
            {subtitle && <p className="text-neutral-500 text-sm">{subtitle}</p>}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          {children}
          <AnimatePresence>
            {error && (
              <motion.p
                key="auth-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        {footer && (
          <div className="text-center text-sm text-neutral-200">{footer}</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
