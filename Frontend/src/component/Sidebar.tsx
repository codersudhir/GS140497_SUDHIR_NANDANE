import type React from "react"
import { useState, useEffect } from "react"
import { BarChart3, Box, LayoutGrid, LineChart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const path = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`shrink-0 border-r bg-white min-h-screen ${isMobile ? "w-[64px]" : "w-[128px]"}`}>
      <nav className="flex flex-col">
        <SidebarItem icon={<LayoutGrid />} label="Store" active={path.pathname === "/store"} isMobile={isMobile} />
        <SidebarItem icon={<Box />} label="SKU" active={path.pathname === "/sku"} isMobile={isMobile} />
        <SidebarItem icon={<LineChart />} label="Planning" active={path.pathname === "/planning"} isMobile={isMobile} />
        <SidebarItem icon={<BarChart3 />} label="Charts" active={path.pathname === "/charts"} isMobile={isMobile} />
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  isMobile: boolean
}

function SidebarItem({ icon, label, active, isMobile }: SidebarItemProps) {
  return (
    <Link
      to={`/${label.toLowerCase()}`}
      className={`flex px-3 items-center gap-2 border-l-4 py-5 transition-colors ${
        active
          ? "border-emerald-600 bg-gray-50 text-emerald-600"
          : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="h-6 w-6">{icon}</div>
      {!isMobile && <span className="text-sm font-medium">{label}</span>}
    </Link>
  )
}
