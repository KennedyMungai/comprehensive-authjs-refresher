import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
