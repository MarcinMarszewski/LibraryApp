import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/global.css';

function MyApp({ Component, pageProps } : any) {
  return (
	<>
    <Sidebar/>
	<div className="main-content">
		<Component {...pageProps}/>
	</div>
	</>
  );
}

export default MyApp;