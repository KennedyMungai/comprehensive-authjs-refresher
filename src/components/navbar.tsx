import UserButton from "@/app/(protected)/_components/user-button";

const Navbar = () => {
  return (
    <nav className="flex h-14 w-full items-center justify-between p-4 shadow-sm">
      <div>Auth</div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
