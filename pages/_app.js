
import Navbar2 from '@/Components/NavBar2'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar2 />
      <Component {...pageProps} />
    </>
  );
}
