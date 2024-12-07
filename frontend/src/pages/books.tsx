import React, { useState, useEffect} from 'react';
import styles from './books.module.css';
import Button from '@/components/Button';


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

	const [searchParams, setSearchParams] = useState({
		title: '',
		author: '',
		isbn: '',
		year: '',
		state: '',
		categories: [],
		books: [],
	  });

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			const response = await fetch('/api/books');
			const data = await response.json();
			if (Array.isArray(data)) {
				setBooks(data);
			  } else {
				console.error('Fetched data is not an array');
			  }
		}
		catch (error) {
			console.error(error);
		}
	};

	const deleteBook = async (id: number) => {
		try {
			const response = await fetch('/api/books/delete/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				fetchBooks();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try{
			const response = await fetch('/api/books/query', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(searchParams),
			});

			const data = await response.json();
			if (Array.isArray(data)) {
				setBooks(data);
			}
		}
		catch (error) {
			console.error(error);
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: value });
	  };

	const handleYearChange = (e) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: parseInt(value) });
	};

	const handleCategoriesChange = (e) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: value.split(',') });
	}

  return (
    <div>
		<h1>Library Books</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={searchParams.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={searchParams.author} onChange={handleInputChange} />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" name="isbn" value={searchParams.isbn} onChange={handleInputChange} />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" name="year" value={searchParams.year} onChange={handleYearChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={searchParams.state} onChange={handleInputChange} />
        </div>
		<div>
			<label>Categories:</label>
			<input type="text" name="categories" onChange={handleCategoriesChange} />
		</div>
        <button type="submit">Search</button>
      </form>
      <ul>
		{books.map((book) => (
			<div className={styles.grid_container}>
				<div className ={styles.grid_item}>{book.title}</div>
				<div className ={styles.grid_item}>{book.author}</div>
				<div className ={styles.grid_item}>{book.isbn}</div>
				<div className ={styles.grid_item}>{book.year}</div>
				<div className ={styles.grid_item}>{book.state}</div>
				<div className ={styles.grid_item}>{book.available ? 'Available' : 'Taken'}</div>
				<div className ={styles.grid_button}><Button onClick={() =>deleteBook(book.id)}>Delete</Button></div>
			</div>
		))}
	  </ul>
    </div>
  );
};

export default Home;