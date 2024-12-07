import React, { useEffect, useState } from 'react';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';

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

  const handleSubmit = async (e) => {
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
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div>
          <label>Categories:</label>
          <MultiSelectDropdown
            options={allCategories}
            selectedOptions={categories}
            onChange={setCategories}
            displayProperty='category_name'/>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;