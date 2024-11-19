import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <Button variant={"secondary"} size="lg">
            Sign in
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
