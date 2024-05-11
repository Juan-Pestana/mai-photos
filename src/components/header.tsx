import { Suspense } from 'react'
import HeaderMenu from './headerMenu'
import { Divide } from 'lucide-react'
import Link from 'next/link'

function Header() {
  return (
    <header className="px-5 py-3 bg-slate-600">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="text-white ">
          SuperLogo
        </Link>
        <Suspense
          fallback={
            <div className="border-2 border-black px-3 py-1 text-red-500 rounded-md">
              {' '}
              Menu
            </div>
          }
        >
          <HeaderMenu />
        </Suspense>
      </div>
    </header>
  )
}

export default Header
