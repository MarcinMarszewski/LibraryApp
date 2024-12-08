import React from "react";

const Loans = () => {
    const [loans, setLoans] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try{
            const response = await fetch('/api/loans');
            const data = await response.json();

            if(Array.isArray(data)){
                setLoans(data);
            }
        } catch(error) {
            console.error(error);
        }
    };

    const returnLoan = async (id: number) => {
        try{
            const response = await fetch('/api/loans/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({book_id: Number(id)}),
            });

            if(response.ok){
                fetchLoans();
            }
        } catch(error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Loans</h1>
            <ul>
                {loans.map((loan) => (
                    <div key={loan.loan_id}>
                        <div>{loan.book_id}</div>
                        <div>{loan.title}</div>
                        <div>{loan.first_name}</div>
                        <div>{loan.last_name}</div>
                        <div>{loan.loan_date}</div>
                        <div>{loan.return_date}</div>
                        <button onClick={() => returnLoan(loan.book_id)}>Return</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Loans;