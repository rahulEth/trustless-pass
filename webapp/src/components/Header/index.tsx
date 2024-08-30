import { Menu } from "@mui/icons-material";
import { useState } from "react";
import ConnectWallet from "../ConnectWallet";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(mobileMenuOpen);

  return (
    <header className={`bg-gray-50 border rounded-b-md ${className}`}>
      <nav
        aria-label="Global"
        className="mx-auto max-w-screen-xl flex items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Trust Pass</span>
            <img alt="" src="trust-pass.svg" className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ConnectWallet />
        </div>
        {/* TODO: create menu for mobile view */}
      </nav>
    </header>
  );
};

export default Header;
