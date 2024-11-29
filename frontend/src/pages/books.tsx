import React, { useState, useEffect} from 'react';
import styles from './books.module.css';

const Home = () => {
	interface Book {
		id: number;
		title: string;
		author: string;
		isbn: string;
		year: number;
		state: string;
		available: boolean;
	}

	const [books, setBooks] = React.useState<Book[]>([]);

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			const response = await fetch('/api/books');
			const data = await response.json();
			setBooks(data);
		}
		catch (error) {
			console.error(error);
		}
	};

  return (
    <div>
      <ul>
		{books.map((books) => (
			<div className={styles.grid_container}>
				<div className ={styles.grid_item}>{books.title}</div>
				<div className ={styles.grid_item}>{books.author}</div>
				<div className ={styles.grid_item}>{books.isbn}</div>
				<div className ={styles.grid_item}>{books.year}</div>
				<div className ={styles.grid_item}>{books.state}</div>
				<div className ={styles.grid_item}>{books.available ? 'Available' : 'Taken'}</div>
			</div>
		))}
	  </ul>
    </div>
  );
};

export default Home;