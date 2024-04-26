import Navbar from "./Navbar"


function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default RootLayout
