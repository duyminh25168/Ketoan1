import React, { useState, useEffect } from "react";

const TNCTForm = ({ onChange }) => {
    const [formData, setFormData] = useState({
        Name: "",
        ID: "",
        Part: "Teaching Department",
        Lương_cơ_bản: 0,
        chi_tieu: [],
        Budget_performance: 0,
        Bonus: 0,
    });

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue =
            name === "Luong_co_ban" ||
            name === "Budget_performance" ||
            name === "Bonus"
                ? Number(value)
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleChiTieuChange = (index, field, value) => {
        const newValue = field === "so_tien" ? Number(value) : value;
        const updatedChiTieu = formData.chi_tieu.map((item, i) =>
            i === index ? { ...item, [field]: newValue } : item
        );
        setFormData((prev) => ({
            ...prev,
            chi_tieu: updatedChiTieu,
        }));
    };

    const handleAddChiTieu = () => {
        setFormData((prev) => ({
            ...prev,
            chi_tieu: [...prev.chi_tieu, { ten_chi_tieu: "", so_tien: 0 }],
        }));
    };

    const handleRemoveChiTieu = (index) => {
        const updatedChiTieu = formData.chi_tieu.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            chi_tieu: updatedChiTieu,
        }));
    };

    return (
        <div className="form-section">
            <h2>Form TNCT</h2>

            <label>
                Họ và tên:
                <input type="text" name="Name" onChange={handleChange} />
            </label>
            <label>
                ID:
                <input type="text" name="ID" onChange={handleChange} />
            </label>

            <label>
                Bộ phận:
                <select name="Part" onChange={handleChange}>
                    <option value="Teaching Department">
                        Teaching Department
                    </option>
                    <option value="Technical Department">
                        Technical Department
                    </option>
                    <option value="HR Department">HR Department</option>
                    <option value="Production Department">
                        Production Department
                    </option>
                    <option value="Supervision Department">
                        Supervision Department
                    </option>
                    <option value="CEO">CEO</option>
                    <option value="R&D">R&D</option>
                    <option value="CFO">CFO</option>
                </select>
            </label>
            <label>
                Lương cơ bản:
                <input
                    type="number"
                    name="Luong_co_ban"
                    onChange={handleChange}
                />
            </label>

            {formData.chi_tieu.length > 0 &&
                formData.chi_tieu.map((chiTieu, index) => (
                    <div key={index} className="chi-tieu-item">
                        <button
                            type="button"
                            onClick={() => handleRemoveChiTieu(index)}
                        >
                            Xóa chỉ tiêu
                        </button>
                        <label>
                            Tên chỉ tiêu:
                            <input
                                type="text"
                                value={chiTieu.ten_chi_tieu}
                                onChange={(e) =>
                                    handleChiTieuChange(
                                        index,
                                        "ten_chi_tieu",
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                        <label>
                            Số tiền:
                            <input
                                type="number"
                                value={chiTieu.so_tien || ""}
                                onChange={(e) =>
                                    handleChiTieuChange(
                                        index,
                                        "so_tien",
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                    </div>
                ))}

            <button type="button" onClick={handleAddChiTieu}>
                Thêm chỉ tiêu
            </button>

            <label>
                Balance (Budget Performance):
                <input
                    type="number"
                    name="Budget_performance"
                    onChange={handleChange}
                />
            </label>
            <label>
                Tiền thưởng:
                <input type="number" name="Bonus" onChange={handleChange} />
            </label>

            <label>
                Ngày tháng:
                <input
                    type="datetime-local"
                    name="Datetime"
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default TNCTForm;
