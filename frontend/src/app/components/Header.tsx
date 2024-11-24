'use client'

import LocaleSwitcher from './LocaleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

type HeaderProps = object

const Header = ({}: HeaderProps) => {
  return (
    <div>
      <nav className='flex items-center justify-end gap-4 p-4 sm:p-6'>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </nav>
    </div>
  )
}

export default Header
