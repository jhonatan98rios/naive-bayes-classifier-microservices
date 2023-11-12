import { signOut } from "next-auth/react"

interface ProfileProps {
  name: string
  email: string
  image: string
}

export function Profile({ name, email, image }: ProfileProps) {

  async function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex items-center w-80 px-2 ml-auto mr-0">
      <img
        className="w-10 h-10 mr-4"
        src={image}
        alt=""
      />

      <div className="flex items-center">
        <div className="flex flex-col">
          <p> {name} </p>
          <p> {email} </p>
        </div>
        <div className="w-10 flex items-center justify-center">
          <button onClick={handleSignOut}>
            <img
              className="w-6"
              src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Users-Exit-icon.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  )
}