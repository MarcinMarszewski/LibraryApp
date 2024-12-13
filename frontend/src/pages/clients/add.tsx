import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./add.module.css";

const AddClient = () => {
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone_number, setPhoneNumber] = React.useState('');

    const addClient = async (e) => {
        e.preventDefault();
        try {
            const client = { first_name, last_name, email, phone_number };
            const response = await fetch('/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(client),
            });
            if(response.ok) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.vertical_fit}>
            <div className={styles.horizontal_fit}>
                <div className={styles.title}>Dodaj Klienta</div>
                <div className={styles.client_btn}><Button onClick={() => window.location.href = "/clients"}>Lista Klientów</Button></div>
            </div>
            <form onSubmit={addClient}>
                <Input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required>Imię:</Input>
                <Input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}>Nazwisko:</Input>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}>E-mail:</Input>
                <Input type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}>Nr. telefonu:</Input>
                <div className={styles.submit}><Button type="submit">Add Client</Button></div>
            </form>
        </div>
    );
}

export default AddClient;