import type React from "react"
import { useState, useEffect } from "react"
import { BarChart3, Box, LayoutGrid, LineChart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

// Sidebar component that adjusts its width based on screen size
export default function Sidebar() {
  const path = useLocation(); // Get the current path from the router
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // State to track if the screen is mobile-sized

  useEffect(() => {
    // Event listener to update isMobile state on window resize
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  return (
    <aside className={`shrink-0 border-r bg-white min-h-screen ${isMobile ? "w-[64px]" : "w-[128px]"}`}>
      <nav className="flex flex-col">
        {/* Render SidebarItem components for each navigation link */}
        <SidebarItem icon={<LayoutGrid />} label="Store" path="/" active={path.pathname === "/"} isMobile={isMobile} />
        <SidebarItem icon={<Box />} label="SKU" path="/sku" active={path.pathname === "/sku"} isMobile={isMobile} />
        <SidebarItem icon={<LineChart />} label="Planning" path="/planning" active={path.pathname === "/planning"} isMobile={isMobile} />
        <SidebarItem icon={<BarChart3 />} label="Charts" path="/charts"  active={path.pathname === "/charts"} isMobile={isMobile} />
      </nav>
    </aside>
  )
}

// Interface for SidebarItem component props
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  isMobile: boolean
  path: string
}

// SidebarItem component for individual navigation links
function SidebarItem({ icon, label, path , active, isMobile }: SidebarItemProps) {
  return (
    <Link
      to={path}
      className={`flex px-3 items-center gap-2 border-l-4 py-5 transition-colors ${
        active
          ? "border-emerald-600  bg-gray-300" // Active link styles
          : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900" // Inactive link styles
      }`}
    >
      <div className="h-6 w-6">{icon}</div> {/* Icon for the link */}
      {!isMobile && <span className="text-sm font-medium">{label}</span>} {/* Label for the link, hidden on mobile */}
    </Link>
  )
}
