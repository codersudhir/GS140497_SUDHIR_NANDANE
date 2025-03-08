import { ChevronDown, User } from "lucide-react"


export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm   py-10">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-32 h-auto md:w-48 md:h-auto" />
        </div>
        
      </div>

      <h1 className="text-lg md:text-2xl font-semibold text-gray-800">Data Viewer App</h1>

      <div className="flex items-center gap-2 mr-4">
        <button className="flex items-center gap-1  p-1 hover:bg-gray-100">
          <User className="h-7 w-7 font-bold text-gray-700 text-xl rounded-full border-2 border-black p-0.5 " />
          <ChevronDown className="h-4 w-4 text-gray-500 fill" />
        </button>
      </div>
    </header>
  )
}

