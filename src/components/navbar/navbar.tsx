import NavHome from "./navHome";
import NavSidebar from "./navSidebar";

const Navbar = () => {
  return (
    <nav className="pointer-events-none fixed z-[999] h-full w-full">
      <NavHome />
      <NavSidebar />
    </nav>
  );
};

export default Navbar;
