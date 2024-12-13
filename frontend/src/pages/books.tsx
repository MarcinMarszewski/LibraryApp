import React, { useState, useEffect} from 'react';
import styles from './books.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';


const Home = () => {
	interface Book {
		categories: Array<string>;
		book_id: number;
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

	const handleSearch = async (e : any) => {
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

	const handleInputChange = (e : any) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: value });
	  };

	const handleYearChange = (e : any) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: parseInt(value) });
	};

	const handleCategoriesChange = (e : any) => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: value.split(',') });
	}

  return (
    <div className={styles.vertical_fit}>
		<div className={styles.horizontal_fit}>
			<div className={styles.title} >Lista Książek</div>
			<div className={styles.add_btn}>
				<Button onClick={() => window.location.href = "/books/add"}>Dodaj Książkę</Button>
			</div>
		</div>
      <form onSubmit={handleSearch}>
        <div>
			<Input type="text" name ="title" onChange={handleInputChange}>Tytuł:</Input>
			<Input type="text" name ="author" onChange={handleInputChange}>Autor:</Input>
			<Input type="text" name ="isbn" onChange={handleInputChange}>ISBN:</Input>
			<Input type="text" name ="year" onChange={handleYearChange}>Rok:</Input>
			<Input type="text" name ="state" onChange={handleInputChange}>Stan:</Input>
			<Input type="text" name ="categories" onChange={handleCategoriesChange}>Kategorie:</Input>
        </div>
		<div className={styles.search_btn} >
			<Button type="submit">Szukaj</Button>
		</div>
      </form>
      <ul>
	  <div className={styles.grid_container_desc}>
				<div className ={styles.grid_item}>Id: Tytuł</div>
				<div className ={styles.grid_item}>Autor</div>
				<div className ={styles.grid_item}>ISBN</div>
				<div className ={styles.grid_item}>Rok</div>
				<div className ={styles.grid_item}>Stan</div>
				<div className ={styles.grid_item}>Kategorie</div>
				<div className ={styles.grid_item}>Dostępność</div>
				<div className ={styles.grid_item_last}>Operacje</div>
			</div>
		{books.map((book) => (
			<div>
			<div className={styles.grid_container}>
				<div className ={styles.grid_item}>{book.book_id}:   {book.title}</div>
				<div className ={styles.grid_item}>{book.author}</div>
				<div className ={styles.grid_item}>{book.isbn}</div>
				<div className ={styles.grid_item}>{book.year}</div>
				<div className ={styles.grid_item}>{book.state}</div>
				<div className ={styles.grid_item}>{book.categories}</div>
				<div className ={styles.grid_item}>{book.available ? 'Dostępna' : 'Wypożyczona'}</div>
				<div className ={styles.grid_button}><Button onClick={() =>deleteBook(book.book_id)}>Usuń</Button></div>
			</div>
			</div>
		))}
	  </ul>
    </div>
  );
};

export default Home;