import CardWrapper from "@/components/card-wrapper";
import { TriangleAlertIcon } from "lucide-react";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/signin"
      backButtonLabel="Back to Sign In"
    >
      <div className="flex w-full items-center justify-center">
        <TriangleAlertIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
