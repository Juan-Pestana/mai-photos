import { auth } from '@/auth/auth'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { redirect } from 'next/navigation'

export default async function HeaderMenu() {
  const session = await auth()
  if (!session) {
    return redirect('/signIn')
  }

  return (
    <>
      <Sheet>
        <SheetTrigger className="border-2 border-white px-3 py-1 text-white rounded-md">
          Menu
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{session.user?.email}</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
