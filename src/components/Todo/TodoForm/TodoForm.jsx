import { useState, useEffect, useRef } from 'react';
import './TodoForm.scss';

function TodoForm({ addOrUpdateTodo, editingTodo }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
        hobbies: [],
        country: '',
        image: null,
        comment: ''
    });
    useEffect(() => {
        if (editingTodo) {
            setFormData(editingTodo);
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                birthDate: '',
                gender: '',
                hobbies: [],
                country: '',
                image: null,
                comment: ''
            });
        }
    }, [editingTodo]);
    const formRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const form = formRef.current;
            if (form.scrollTop > 0) {
                form.style.marginTop = '20px';
                form.style.padding = '0 0 20px 0';
            } else {
                form.style.marginTop = '10px';
                form.style.padding = '10px 0 20px 0';
            }
        };
        const formElement = formRef.current;
        formElement.addEventListener('scroll', handleScroll);
        return () => formElement.removeEventListener('scroll', handleScroll);
    }, []);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                hobbies: checked
                    ? [...prev.hobbies, value]
                    : prev.hobbies.filter((hobby) => hobby !== value)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setFormData((prev) => ({ ...prev, image: e.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrUpdateTodo(formData);
        setFormData({
            name: '',
            email: '',
            phone: '',
            birthDate: '',
            gender: '',
            hobbies: [],
            country: '',
            image: null,
            comment: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className="malumot">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                <div className="labelline">Ism va Familiya</div>
            </div>

            <div className="malumot">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                <div className="labelline">Email</div>
            </div>

            <div className="malumot">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required/>
                <div className="labelline">Telefon Raqami</div>
            </div>

            <div className="malumot">
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}/>
                <div className="labelline">Tug'ilgan Sana</div>
            </div>

            <div className="malumot radio-group">
                <label>Jinsingiz:</label>
                <label>
                    <input type="radio" name="gender" value="Erkak" checked={formData.gender === 'Erkak'} onChange={handleChange} required  /> Erkak
                </label>
                <label>
                    <input type="radio" name="gender" value="Ayol" checked={formData.gender === 'Ayol'} onChange={handleChange} required /> Ayol
                </label>
            </div>

            <div className="malumot checkbox-group">
                <label>Hobbilaringiz:</label>
                <label>
                    <input type="checkbox" name="hobbies" value="Sport" checked={formData.hobbies.includes('Sport')} onChange={handleChange}  /> Sport
                </label>
                <label>
                    <input  type="checkbox"  name="hobbies"  value="Kitob o'qish"  checked={formData.hobbies.includes("Kitob o'qish")}  onChange={handleChange} /> Kitob o'qish
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Musiqa" checked={formData.hobbies.includes('Musiqa')} onChange={handleChange}/> Musiqa
                </label>
            </div>

            <div className="malumot">
                <select name="country" value={formData.country} onChange={handleChange} required >
                    <option value="">Mamlakatni tanlang</option>
                    <option value="Uzbekistan">O'zbekiston</option>
                    <option value="Kazakhstan">Qozog'iston</option>
                    <option value="Turkey">Turkiya</option>
                    <option value="Russia">Rossiya</option>
                    <option value="Turkmanistan">Turkmanistan</option>
                    <option value="Qirg'iston">Qirg'iston</option>
                    <option value="Xitoy">Xitoy</option>
                </select>
            </div>

            <div className="malumot">
                <label htmlFor="profileImage" className="custom-file-upload">📁 Surat Yuklash</label>
                <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
                {formData.image && (
                    <div className="image-preview">
                        <img src={formData.image} alt="Rasm" className="preview" />
                        <button type="button" className="remove-btn"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, image: null }))
                            }> ✖
                        </button>
                    </div>
                )}
            </div>

            <div className="malumot">
                <textarea name="comment" value={formData.comment} onChange={handleChange} rows="4"></textarea>
                <div className="labelline">Qo'shimcha Izoh</div>
            </div>

            <button type="submit">{editingTodo ? 'Yangilash' : 'Yuborish'}</button>
        </form>
    );
}



export default TodoForm;
