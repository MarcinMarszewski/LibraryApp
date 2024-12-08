import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/global.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

function MyApp({ Component, pageProps } : any) {
  return (
	<>
	<div>
		<div className='sidebar'>
			<Sidebar/>
		</div>
		<div className='main-site'>
			<div className='header'>
				<Header/>
			</div>
			<div className="main-content">
				<Component {...pageProps}/>
			</div>
			<div className='footer'>
				<Footer/>
			</div>
		</div>
	</div>
	</>
  );
}

export default MyApp;