import React from "react";

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
        <div>
            <h1>Add Client</h1>
            <form onSubmit={addClient}>
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
                <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="tel" placeholder="Old Phone Number" onChange={(e) => setOldPhoneNumber(e.target.value)}/>
                <input type="tel" placeholder="New Phone Number" onChange={(e) => setNewPhoneNumber(e.target.value)}/>
                <button type="submit">Add Client</button>
            </form>
        </div>
    );
}

export default EditClient;