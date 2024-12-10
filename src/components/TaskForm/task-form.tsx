import { useState, useEffect } from 'react';
import { Task } from '../../data/tasks';
import styles from "./task-form.module.css";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onClose: () => void;
  existingTask: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose, existingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDate(convertToHTMLDate(existingTask.date));
      setHeure(existingTask.heure);
    }
  }, [existingTask]);

  const convertToHTMLDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  const convertToDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getNewTaskId = (): number => {
    const currentMaxId = localStorage.getItem('maxTaskId');
    const newId = currentMaxId ? parseInt(currentMaxId, 10) + 1 : 1;
    localStorage.setItem('maxTaskId', newId.toString());
    return newId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask: Task = {
      id: existingTask ? existingTask.id : getNewTaskId(),
      title,
      description,
      date: convertToDisplayDate(date),
      heure,
      status: existingTask ? existingTask.status : 0,
    };

    onAddTask(updatedTask);
    onClose();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("task-form-page")) {
      onClose();
    }
  };

  return (
    <div className="task-form-page" onClick={handleOutsideClick}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">{existingTask ? 'Update Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Task Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-textarea"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="form-input"
            type="time"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
          />
          <div className="form-actions">
        
            <button type="submit" className="submit-btn">
              {existingTask ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
