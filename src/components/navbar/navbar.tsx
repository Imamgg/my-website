import NavHome from "./navHome";
import NavMenu from "./navMenu";

const Navbar = () => {
  return (
    <nav className="pointer-events-none fixed z-[999] h-full w-full">
      <NavHome />
      <NavMenu />
    </nav>
  );
};

export default Navbar;
