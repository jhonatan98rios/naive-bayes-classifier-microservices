import { useSession, signIn, signOut } from "next-auth/react";
import GoogleButton from 'react-google-button'
import { LogInAvatar } from "@/components/LogInAvatar";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


export default function Home() {

  const { data: session } = useSession()

  async function handleSignIn() {
    signIn('google')
  }

  async function handleSignOut() {
    signOut()
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex h-32 flex-col items-center justify-between p-4 mt-16">
        <p className="mb-8"> Autenticação de filho da puta </p>

        {
          !session?.user &&
          <GoogleButton onClick={handleSignIn} />
        }

        {
          session?.user &&
          <LogInAvatar
            email={session.user.email!}
            name={session.user.name!}
            image={session.user.image!}
          />
        }

        {
          session?.user &&
          <button className="mt-8" onClick={handleSignOut}>
            Sai daí
          </button>
        }
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = (async (context) => {

  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/classifiers",
      },
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
})