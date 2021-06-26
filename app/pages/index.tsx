import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { GetStaticProps } from "next"
import { Columns, Box } from "bumbag"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="w-20 h-10 bg-red-300"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <div className="w-48 flex content-around border border-solid">
        <Link href={Routes.SignupPage()}>
          <a className="w-20 h-10 bg-red-300 text-center pt-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="w-20 h-10 bg-red-300 text-center pt-2">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      content: "Welcome to the demo!",
    },
  }
}

const Home = ({ content }) => {
  return (
    <div className="container">
      <main>
        <div className="logo"></div>
        <p>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </p>
        <p>It will be inserted here: {content}</p>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <Columns>
          <Columns.Column>
            <Box backgroundColor="whitesmoke" padding="0.5rem">
              First column
            </Box>
          </Columns.Column>
          <Columns.Column>
            <Box backgroundColor="whitesmoke" padding="0.5rem">
              Second column
            </Box>
          </Columns.Column>
          <Columns.Column>
            <Box backgroundColor="whitesmoke" padding="0.5rem">
              Third column
            </Box>
          </Columns.Column>
          <Columns.Column>
            <Box backgroundColor="whitesmoke" padding="0.5rem">
              Fourth column
            </Box>
          </Columns.Column>
        </Columns>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
