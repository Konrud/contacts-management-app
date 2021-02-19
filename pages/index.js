import Head from 'next/head'
import Contacts from "../Components/Contacts/contacts";


export default function Home() {
  return (
    <>
      <Head>
        <title>Contacts Management App</title>
        <script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <header className="c-header">
        <h1 className="c-header__title">Contacts Management System</h1>
      </header>
      <Contacts />
    </>
  )
}
