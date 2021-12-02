import '../styles/globals.css'
import { Provider } from "next-auth/client";
import 'tailwindcss/tailwind.css'



function MyApp({ Component, pageProps }) {
  return(
    <Provider options={{clientMaxAge: 0 }} session={pageProps.session}>
 <Component {...pageProps} />
    </Provider>
  )
  
}

export default MyApp
