import React, { useState, useEffect } from "react";

const TNCNForm = ({ onChange }) => {
    const [formData, setFormData] = useState({
        Datetime: "",
        Tên_nhân_viên: "",
        ID: "",  
        Lương_chưa_thuế: 0,
        Hệ_số: "TN*5%",
        Giảm_trừ_bản_thân: 0,
        Bảo_hiểm: 0,
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = ["Luong_chua_thue", "Giam_tru_ban_than", "Bao_hiem"].includes(name)
            ? Number(value) 
            : name === "ID" 
            ? value 
            : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    return (
        <div className="form-section">
            <h2>Form TNCN</h2>
            <label>
                Ngày tháng:
                <input
                    type="datetime-local"
                    name="Datetime"
                    onChange={handleChange}
                />
            </label>
            <label>
                Họ và tên:
                <input
                    type="text"
                    name="Ten_nhan_vien"
                    onChange={handleChange}
                />
            </label>
            <label>
                ID:
                <input type="text" name="ID" onChange={handleChange} />
            </label>
            <label>
                Lương chưa thuế:
                <input
                    type="number"
                    name="Luong_chua_thue"
                    onChange={handleChange}
                />
            </label>
            <label>
                Hệ số:
                <select name="He_so" onChange={handleChange}>
                    <option value="TN*5%">TN*5%</option>
                    <option value="TN*10%-0.25 triệu VND">TN*10%-0.25 triệu VND</option>
                    <option value="TN*15%-0.75 triệu VND">TN*15%-0.75 triệu VND</option>
                    <option value="TN*20%-1.65 triệu VND">TN*20%-1.65 triệu VND</option>
                    <option value="TN*25%-3.25 triệu VND">TN*25%-3.25 triệu VND</option>
                    <option value="TN*30%-5.85 triệu VND">TN*30%-5.85 triệu VND</option>
                    <option value="TN*35%-9.85 triệu VND">TN*35%-9.85 triệu VND</option>
                </select>
            </label>
            <label>
                Giảm trừ bản thân:
                <input
                    type="number"
                    name="Giam_tru_ban_than"
                    onChange={handleChange}
                />
            </label>
            <label>
                Tiền đóng bảo hiểm:
                <input type="number" name="Bao_hiem" onChange={handleChange} />
            </label>
        </div>
    );
};

export default TNCNForm;
