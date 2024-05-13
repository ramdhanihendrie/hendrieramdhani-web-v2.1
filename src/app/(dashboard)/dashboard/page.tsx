"use client"
import { Button } from "@headlessui/react"
import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const {data: session, status} = useSession()

  if(status === 'loading') {
    return <p>Please wait...</p>
  }

  return (
    <>
      <Button onClick={() => signOut()}>
        Sign Out
      </Button>
      <p>hello {session?.user?.name}</p>
      <p>You're {session?.user?.role}</p>
      <p>{status}</p>
    </>
  )
}

export default DashboardPage