import React from "react";

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
        <div>
            <h1>Add Client</h1>
            <form onSubmit={addLoan}>
                <input type="number" placeholder="Book Id" onChange={(e) => setBookId(Number(e.target.value))} required/>
                <input type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                <button type="submit">Add Loan</button>
            </form>
        </div>
    );
}

export default AddLoan;