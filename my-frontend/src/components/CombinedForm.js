// CombinedForm.js
import React, { useState } from 'react';
import TNCTForm from './TNCTForm';
import TNCNForm from './TNCNForm';
import LoanForm from './LoanForm';
import ExpenseReimbursementForm from './ExpenseReimbursementForm';
import InsuranceForm from "./InsuranceForm"

const CombinedForm = () => {
    const [tnctData, setTnctData] = useState({});
    const [tncnData, setTncData] = useState({});
    const [loanData, setLoanData] = useState({});
    const [expenseData, setExpenseData] = useState({});
    const [insuranceData, setInsuranceData] = useState({});

    const handleTnctChange = (data) => {
        setTnctData(data);
    };

    const handleTncChange = (data) => {
        setTncData(data);
    };

    const handleLoanChange = (data) => {
        setLoanData(data);
    };

    const handleExpenseChange = (data) => {
        setExpenseData(data);
    };

    const handleInsuranceChange = (data) => {
        setInsuranceData(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullData = {
            tnct: tnctData,
            tncn: tncnData,
            loan: loanData,
            expense: expenseData,
            insurance: insuranceData,
        };

        try {
            console.log('Data to be sent:', JSON.stringify(fullData, null, 2));

            const response = await fetch('http://localhost:5000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullData),
            });

            if (response.ok) {
                const successData = await response.json();
                console.log('Data saved successfully:', successData);

                setTnctData({});
                setTncData({});
                setLoanData({});
                setExpenseData({});
                setInsuranceData({});
            } else {
                const errorData = await response.json();
                console.error('Error saving data:', response.statusText, errorData);
            }
        } catch (error) {
            console.error('Error saving data:', error.message || error);
        }
    };

    return (
        <div className="combined-form">
            <h1>Form Nhập Dữ Liệu</h1>
            <form onSubmit={handleSubmit}>
                <TNCTForm onChange={handleTnctChange} />
                <TNCNForm onChange={handleTncChange} />
                <LoanForm onChange={handleLoanChange} />
                <ExpenseReimbursementForm onChange={handleExpenseChange} />
                <InsuranceForm onChange={handleInsuranceChange} />
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
};

export default CombinedForm;
