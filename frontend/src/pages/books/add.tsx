import React, { useEffect, useState } from 'react';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import styles from './add.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (Array.isArray(data)) {
            setAllCategories(data);
        }
    } catch (error) {
        console.error(error);
    }
}

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const newBook = { title, author, isbn, year: Number(year), state, categories };
    console.log(newBook);
    try {
      const response = await fetch('/api/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Clear the form
        setTitle('');
        setAuthor('');
        setIsbn('');
        setYear('');
        setState('');
        setCategories([]);
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className={styles.vertical_fit}>
      <div className={styles.horizontal_fit}>
        <div className={styles.title} >Dodaj Książkę</div>
          <div className={styles.books_btn}>
            <Button onClick={() => window.location.href = "/books"}>Lista Książek</Button>
          </div>
		  </div>

      <form onSubmit={handleSubmit}>
        <Input type="text" name ="title" onChange={(e : any) => setTitle(e.target.value)}>Tytuł:</Input>
        <Input type="text" name ="author" onChange={(e : any) => setAuthor(e.target.value)}>Autor:</Input>
        <Input type="text" name ="isbn" onChange={(e : any) => setIsbn(e.target.value)}>ISBN:</Input>
        <Input type="text" name ="year" onChange={(e : any) => setYear(e.target.value)}>Rok:</Input>
        <Input type="text" name ="state" onChange={(e : any) => setState(e.target.value)}>Stan:</Input>
        <div className={styles.category_select}>
          <MultiSelectDropdown
            options={allCategories}
            selectedOptions={categories}
            onChange={setCategories}
            displayProperty='category_name'/>
        </div>
        <div className={styles.add_btn}>
         <Button type="submit">Dodaj Książkę</Button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;