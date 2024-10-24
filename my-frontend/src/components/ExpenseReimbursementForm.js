import React, { useState, useEffect } from "react";

const ExpenseReimbursementForm = ({ onChange }) => {
    const [formData, setFormData] = useState({
        Số_học_viên_không_đủ_chỉ_tiêu: {
            Số_lượng_học_viên: 0,
            Số_tiền_HV: 0,
        },
        Default_fee: {
            Số_tiền_Def: 0,
        },
        Outsourcing: {
            Số_tiền_Outs: 0,
        },
        Số_ngày_nghỉ_không_phép: {
            Số_ngày: 0,
            Số_tiền_trên_một_ngày_nghỉ: 0,
        },
        Thiếu_chỉ_tiêu: [],
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const path = name.split(".");
        setFormData((prev) => {
            let updated = { ...prev };
            if (path.length === 2) {
                updated[path[0]] = {
                    ...prev[path[0]],
                    [path[1]]: value === "" ? 0 : parseFloat(value),
                };
            } else {
                updated[name] = value === "" ? 0 : parseFloat(value);
            }
            return updated;
        });
    };

    const handleArrayChange = (index, e) => {
        const { name, value } = e.target;
        const newArray = [...formData.Thiếu_chỉ_tiêu];
        newArray[index] = {
            ...newArray[index],
            [name]: value, 
        };
        setFormData((prev) => ({
            ...prev,
            Thiếu_chỉ_tiêu: newArray,
        }));
    };

    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            Thiếu_chỉ_tiêu: [
                ...prev.Thiếu_chỉ_tiêu,
                {
                    Tên_chỉ_tiêu: "",
                    Người_đăng_ký: "", 
                    Số_tiền_bồi_thường: 0,
                },
            ],
        }));
    };

    const removeItem = (index) => {
        const newArray = formData.Thiếu_chỉ_tiêu.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            Thiếu_chỉ_tiêu: newArray,
        }));
    };

    return (
        <div className="form-section">
            <h2>Form Khấu Trừ Chi Phí</h2>
            <label>
                Số lượng học viên không đủ chỉ tiêu:
                <input
                    type="number"
                    name="Số_học_viên_không_đủ_chỉ_tiêu.Số_lượng_học_viên"
                    onChange={handleChange}
                    value={formData.Số_học_viên_không_đủ_chỉ_tiêu.Số_lượng_học_viên}
                />
            </label>
            <label>
                Số tiền HV:
                <input
                    type="number"
                    name="Số_học_viên_không_đủ_chỉ_tiêu.Số_tiền_HV"
                    onChange={handleChange}
                    value={formData.Số_học_viên_không_đủ_chỉ_tiêu.Số_tiền_HV}
                />
            </label>
            <label>
                Số tiền Default_fee:
                <input
                    type="number"
                    name="Default_fee.Số_tiền_Def"
                    onChange={handleChange}
                    value={formData.Default_fee.Số_tiền_Def}
                />
            </label>
            <label>
                Số tiền Outsourcing:
                <input
                    type="number"
                    name="Outsourcing.Số_tiền_Outs"
                    onChange={handleChange}
                    value={formData.Outsourcing.Số_tiền_Outs}
                />
            </label>
            <label>
                Số ngày nghỉ không phép:
                <input
                    type="number"
                    name="Số_ngày_nghỉ_không_phép.Số_ngày"
                    onChange={handleChange}
                    value={formData.Số_ngày_nghỉ_không_phép.Số_ngày}
                />
            </label>
            <label>
                Số tiền trên một ngày nghỉ:
                <input
                    type="number"
                    name="Số_ngày_nghỉ_không_phép.Số_tiền_trên_một_ngày_nghỉ"
                    onChange={handleChange}
                    value={formData.Số_ngày_nghỉ_không_phép.Số_tiền_trên_một_ngày_nghỉ}
                />
            </label>

            <h3>Chỉ tiêu đã thiếu</h3>
            {formData.Thiếu_chỉ_tiêu.map((item, index) => (
                <div key={index} className="chi-tieu-item">
                    <button type="button" onClick={() => removeItem(index)}>
                        Xóa chỉ tiêu
                    </button>
                    <label>
                        Tên chỉ tiêu:
                        <input
                            type="text"
                            name="Tên_chỉ_tiêu"
                            value={item.Tên_chỉ_tiêu}
                            onChange={(e) => handleArrayChange(index, e)}
                        />
                    </label>
                    <label>
                        Người đăng ký:
                        <input
                            type="text"
                            name="Người_đăng_ký"
                            value={item.Người_đăng_ký}
                            onChange={(e) => handleArrayChange(index, e)}
                        />
                    </label>
                    <label>
                        Số tiền bồi thường:
                        <input
                            type="number"
                            name="Số_tiền_bồi_thường"
                            value={item.Số_tiền_bồi_thường}
                            onChange={(e) => handleArrayChange(index, e)}
                        />
                    </label>
                </div>
            ))}

            <button type="button" onClick={addItem}>
                Thêm chỉ tiêu
            </button>
        </div>
    );
};

export default ExpenseReimbursementForm;
