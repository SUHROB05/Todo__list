import './TodoCard.scss';

const TodoCard = ({ todo, onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="profile">
                <img src={todo.image || 'profile.png'} alt="Profile" />
                <b><strong>F.I:</strong> {todo.name}</b>
            </div>
            <div className="text">
                <p><strong>Email:</strong> <a href={`mailto:${todo.email}`}>{todo.email}</a></p>
                <p><strong>Tel:</strong> <a href={`tel:${todo.phone}`}>{todo.phone}</a></p>
                <p><strong>Tavallud:</strong> {todo.birthDate}</p>
                <p><strong>Jins:</strong> {todo.gender}</p>
                <p><strong>Hobbi:</strong> {todo.hobbies.join(', ')}</p>
                <p><strong>Mamlakat:</strong> {todo.country}</p>
                <p><strong>Comment:</strong> {todo.comment}</p>
                <div className="buttons">
                    <button className="edit" onClick={() => onEdit(todo)}>Edit</button>
                    <button className="delete" onClick={() => onDelete(todo.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;