import { auth } from '@/auth/auth'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { redirect } from 'next/navigation'
import CreateAlbumForm from './CreateAlbumForm'

export default async function HeaderMenu() {
  const session = await auth()
  if (!session) {
    return null
  }

  return (
    <>
      <Sheet>
        <SheetTrigger className="border-2 border-white px-3 py-1 text-white rounded-md">
          Create Album
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{session.user?.email}</SheetTitle>
          </SheetHeader>
          <hr />
          <nav className="h-full flex flex-col">
            <div className="mt-8">
              <h3 className="text-lg">Create new album</h3>
              <hr />
            </div>
            <CreateAlbumForm />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
