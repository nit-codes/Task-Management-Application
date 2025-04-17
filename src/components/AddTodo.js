import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo({ text: input });
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddTodo;
