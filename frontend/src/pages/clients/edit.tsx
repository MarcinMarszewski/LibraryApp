import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";   
import styles from "./edit.module.css";

const EditClient = () => {
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [old_phone_number, setOldPhoneNumber] = React.useState('');
    const [new_phone_number, setNewPhoneNumber] = React.useState('');

    const addClient = async (e) => {
        e.preventDefault();
        try {
            const client = { first_name, last_name, email, old_phone_number, new_phone_number};
            const response = await fetch('/api/users/update', {
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
                setOldPhoneNumber('');
                setNewPhoneNumber('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.vertical_fit}>
            <div className={styles.horizontal_fit}>
                <div className={styles.title}>Edytuj Dane Klienta</div>
                <div className={styles.client_btn}><Button onClick={() => window.location.href = "/clients"}>Lista Klientów</Button></div>
            </div>
            <form onSubmit={addClient}>
                <div>
                    <Input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required>Imię:</Input>
                    <Input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}>Nazwisko:</Input>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}>E-mail:</Input>
                    <Input type="tel" placeholder="Old Phone Number" onChange={(e) => setOldPhoneNumber(e.target.value)}>Stary nr. telefonu:</Input>
                    <Input type="tel" placeholder="New Phone Number" onChange={(e) => setNewPhoneNumber(e.target.value)}>Nowy nr. telefonu:</Input>
                </div>
                <div className={styles.submit}><Button type="submit">Edytuj</Button></div>
            </form>
        </div>
    );
}

export default EditClient;