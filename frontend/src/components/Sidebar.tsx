import React from 'react';
import styles from './Sidebar.module.css';
import Button from './Button';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
			  <Button onClick={() => window.location.href = '/'}>
				Home
			  </Button>
			  <Button onClick={() => window.location.href = '/books'}>
				Books
			  </Button>
			  <Button onClick={() => window.location.href = '/info'}>
				Info
			  </Button>
    </div>
  );
};

export default Sidebar;