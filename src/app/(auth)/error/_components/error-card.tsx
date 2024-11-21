import BackButton from "@/components/back-button";
import Header from "@/components/header";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const ErrorCard = () => {
  return (
    <Card className="w-96 shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Go back" href="/signin" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
