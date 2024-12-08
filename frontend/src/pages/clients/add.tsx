import React from "react";

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
        <div>
            <h1>Add Client</h1>
            <form onSubmit={addClient}>
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
                <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                <button type="submit">Add Client</button>
            </form>
        </div>
    );
}

export default AddClient;