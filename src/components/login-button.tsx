"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();

  const onClick = () => router.push("/signin");

  if (mode === "modal") {
    // TODO: Implement modal
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LoginButton;
