import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export interface HomePageLayoutProps {
  className?: string;
}
const HomePageLayout = ({ className = "" }: HomePageLayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Header />
      <main className="flex-grow p-6 grid grid-cols-12 gap-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
