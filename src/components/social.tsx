"use client";

import { socialLoginAction } from "@/actions/socials-actions";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Social = () => {
  const { execute } = useAction(socialLoginAction, {
    onError: () => toast.error("Authentication failed"),
  });

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant={"outline"}
        onClick={() => execute({ provider: "google" })}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant={"outline"}
        onClick={() => execute({ provider: "github" })}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

export default Social;
