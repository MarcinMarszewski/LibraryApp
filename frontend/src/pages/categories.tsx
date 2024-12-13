import React, { useEffect, useState } from 'react';
import styles from './categories.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';

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
        <div className={styles.vertical_fit}>
            <div className={styles.title}>Kategorie</div>
            <form onSubmit={handleAddCategory}>
                <div className={styles.horizontal_fit}>
                    <div className={styles.input}>
                        <Input type="text" onChange={(e : any) => setNewCategory(e.target.value)}>Nazwa:</Input>
                    </div>
                    <div className={styles.submit}>
                        <Button type="submit">Dodaj</Button>
                    </div>
                </div>
            </form>
            <ul>
                {categories.map((category) => (
                    <div className={styles.horizontal_fit} key={category.category_id}>
                        <div className={styles.category_name}>{category.category_name}</div>
                        <div className={styles.delete_btn}><Button onClick={() => handleRemoveCategory(category.category_id)}>Usuń</Button></div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Categories;