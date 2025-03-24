'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { useState } from 'react'

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      {/* Left side */}
      <NavbarBrand>
        <p className='font-bold text-inherit'>MyApp</p>
      </NavbarBrand>

      {/* Hamburger */}
      <NavbarContent className='sm:hidden' justify='end'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      {/* Desktop Nav Links */}
      <NavbarContent className='hidden gap-4 sm:flex' justify='end'>
        <a href='#'>Home</a>
        <a href='#'>Features</a>
        <a href='#'>Contact</a>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <NavbarMenuItem>
          <a href='#'>Home</a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href='#'>Features</a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href='#'>Contact</a>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
