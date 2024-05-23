import "@/styles/globals.css";
import {ThemeProvider} from 'next-themes'


const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App