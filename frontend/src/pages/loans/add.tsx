import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./add.module.css";

const AddLoan = () => {
    const [bookId, setBookId] = React.useState(-1);
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const addLoan = async (e) => {
        e.preventDefault();
        try{
            const loan = { book_id: bookId, user_phone_number: phoneNumber };
            const response = await fetch('/api/loans/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loan),
            });
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.vertical_fit}>
            <div className={styles.horizontal_fit}>
                <div className={styles.title}>Dodaj Wypożyczenie</div>
                <div className={styles.client_btn}><Button onClick={() => window.location.href = "/loans"}>Lista Wypożyczeń</Button></div>
            </div>
            <form onSubmit={addLoan}>
                <Input type="number" placeholder="Book Id" onChange={(e) => setBookId(Number(e.target.value))} required>Numer książki:</Input>
                <Input type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}>Nr. tel. Klienta:</Input>
                <div  className={styles.submit}><Button type="submit">Dodaj</Button></div>
            </form>
        </div>
    );
}

export default AddLoan;