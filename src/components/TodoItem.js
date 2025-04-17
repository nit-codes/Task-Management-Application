import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {todo.text}
        </li>
    );
};

export default TodoItem;
