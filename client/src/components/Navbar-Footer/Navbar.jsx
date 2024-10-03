import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom';
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <nav className="bg-[#0f172a] p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl">Logo</div>
  
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:text-[#38bdf8]">Home</NavLink>
            <NavLink to="/user-dashboard" className="text-white hover:text-[#38bdf8]">User</NavLink>
            <NavLink to="/register" className="text-white hover:text-[#38bdf8]">Register</NavLink>
          </div>
  
          {/* CTA Button */}
          <NavLink to={"/login"} className="hidden md:block bg-[#38bdf8] text-white px-4 py-2 rounded hover:bg-[#0ea5e9]">
            Get Started
          </NavLink>
  
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
  
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <a href="/" className="block text-white py-2 px-4 hover:bg-[#1e293b]">Home</a>
            <a href="/user-dashboard" className="block text-white py-2 px-4 hover:bg-[#1e293b]">User</a>
            <a href="#" className="block text-white py-2 px-4 hover:bg-[#1e293b]">Register</a>
            <a href="/register" className="block text-white py-2 px-4 hover:bg-[#1e293b]">Contact</a>
            <button className="w-full text-left bg-[#38bdf8] text-white py-2 px-4 mt-2 hover:bg-[#0ea5e9]">
              Get Started
            </button>
          </div>
        )}
      </nav>
    )
};
