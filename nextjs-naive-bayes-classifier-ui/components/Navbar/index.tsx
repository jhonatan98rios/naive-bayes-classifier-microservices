import { useSession } from "next-auth/react";
import { Profile } from "../Profile";

export default function Navbar({ }) {

  const { data: session } = useSession()

  return (
    <nav className="flex w-full p-2 bg-white">
      <ul className="">

      </ul>
      
      {
        (session && session.user && session.user.name) &&
        <Profile
          name={session?.user?.name!}
          email={session?.user?.email!}
          image={session?.user?.image!}
        />
      }
    </nav>
  )
}