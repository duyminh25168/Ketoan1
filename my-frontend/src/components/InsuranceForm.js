import React, { useState, useEffect } from "react";

const InsuranceForm = ({ onChange }) => {
    const [formData, setFormData] = useState({
        BHXH: "",
        BHTN: "",
        BHYT: "",
        Luong_dong_bao_hiem: "",
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = (name === "BHXH" || name === "BHTN" || name === "BHYT") 
            ? (value === "" ? "" : parseFloat(value) / 100) 
            : (value === "" ? "" : parseFloat(value));

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    return (
        <div className="form-section">
            <h2>Bảo hiểm</h2>
            <label>
                BHXH (8%):
                <input
                    type="number"
                    name="BHXH"
                    value={formData.BHXH*100}
                    onChange={handleChange}
                    placeholder="Nhập tỷ lệ BHXH"
                />
            </label>

            <label>
                BHTN (1%):
                <input
                    type="number"
                    name="BHTN"
                    value={formData.BHTN*100}
                    onChange={handleChange}
                    placeholder="Nhập tỷ lệ BHTN"
                />
            </label>

            <label>
                BHYT (1.5%):
                <input
                    type="number"
                    name="BHYT"
                    value={formData.BHYT*100}
                    onChange={handleChange}
                    placeholder="Nhập tỷ lệ BHYT"
                />
            </label>

            <label>
                Lương đóng bảo hiểm:
                <input
                    type="number"
                    name="Luong_dong_bao_hiem"
                    value={formData.Luong_dong_bao_hiem}
                    onChange={handleChange}
                    placeholder="Nhập lương đóng bảo hiểm"
                />
            </label>
        </div>
    );
};

export default InsuranceForm;
