import React from 'react';
import styles from './Sidebar.module.css';
import Button from './Button';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
		<div className={styles.inner_div}>
			  <Button onClick={() => window.location.href = '/'}>
				Strona Główna
			  </Button>
			  <Button onClick={() => window.location.href = '/books'}>
				Książki
			  </Button>
			  <Button onClick={() => window.location.href = '/categories'}>
				Kategorie
			  </Button>
			  <Button onClick={() => window.location.href = '/clients'}>
				Klienci
			  </Button>
			  <Button onClick={() => window.location.href = '/loans'}>
				Wypożyczenia
			  </Button>
		</div>
    </div>
  );
};

export default Sidebar;