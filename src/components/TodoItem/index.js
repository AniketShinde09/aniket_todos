import { useState } from 'react';
import './index.css';

const TodoItem = props => {
  const { eachTodoItem, onDelete, onCheck, onEditTodo, onSaveTodo } = props;
  const { id, title, todoCompleted } = eachTodoItem;

  const [saveBtn, updateSaveBtn] = useState(false);

  const onDeleteItem = () => {
    onDelete(id);
  };

  const onClickCheck = e => {
    onCheck(id, e.target.value);
  };

  const onEditItem = () => {
    updateSaveBtn(prevState => !prevState);
    onEditTodo(id);
  };

  const onSaveItem = () => {
    updateSaveBtn(prevState => !prevState);
    onSaveTodo(id);
  };

  return (
    <li className='each-task'>
      <p className='task-name'>{title}</p>
      <div className='task-btn-container'>
        {saveBtn ? (
          <button type='button' className='save-btn' onClick={onSaveItem}>Save</button>
        ) : (
          <button type='button' className='edit-btn' onClick={onEditItem}>Edit</button>
        )}
        <select value={todoCompleted} onChange={onClickCheck} className='task-status-btn'>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Completed">Completed</option>
        </select>
        <button type='button' className='del-btn' onClick={onDeleteItem}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
