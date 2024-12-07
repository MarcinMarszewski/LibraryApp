import React, { useEffect, useState } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();

            if (Array.isArray(data)) {
                setCategories(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addCategory = async (name: string) => {
        try {
            const response = await fetch('/api/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
            addCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    const handleRemoveCategory = async (categoryId: string) => {
        try {
            const response = await fetch('/api/categories/delete/'+categoryId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Manage Categories</h1>
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                    required
                />
                <button type="submit">Add Category</button>
            </form>
            <ul>
                {categories.map((category) => (
                    <li key={category.category_id}>
                        {category.category_name}
                        <button onClick={() => handleRemoveCategory(category.category_id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;