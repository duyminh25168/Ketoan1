import React, { useState, useEffect } from "react";

const LoanForm = ({ onChange }) => {
    const [formData, setFormData] = useState({
        Loan_type: "Planning",
        Name: "",
        Datetime: "",
        Expired_days: "",
        Value: 0,
        Refund_date: "", 
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === "Value" ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    return (
        <div className="form-section">
            <h2>Form Vay Mượn</h2>
            <label>
                Loại vay:
                <select name="Loan_type" onChange={handleChange}>
                    <option value="Planning">Planning</option>
                    <option value="Item">Item</option>
                </select>
            </label>
            <label>
                Tên nhân viên:
                <input type="text" name="Name" onChange={handleChange} />
            </label>
            <label>
                Thời gian đăng ký vay mượn:
                <input
                    type="datetime-local"
                    name="Datetime"
                    onChange={handleChange}
                />
            </label>
            <label>
                Ngày hết hạn:
                <input
                    type="date"
                    name="Expired_days"
                    onChange={handleChange}
                />
            </label>
            <label>
                Số tiền:
                <input
                    type="number"
                    name="Value"
                    min="1000000"
                    max="10000000"
                    onChange={handleChange}
                />
            </label>
            <label>
                Ngày hoàn trả:
                <input
                    type="datetime-local"
                    name="Refund_date" 
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default LoanForm;
