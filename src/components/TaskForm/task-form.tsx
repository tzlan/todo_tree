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

  // Convert dd/MM/yyyy to yyyy-MM-dd
  const convertToHTMLDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Convert yyyy-MM-dd to dd/MM/yyyy
  const convertToDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Function to get a new unique ID using a counter
  const getNewTaskId = (): number => {
    const currentMaxId = localStorage.getItem('maxTaskId');
    const newId = currentMaxId ? parseInt(currentMaxId, 10) + 1 : 1;
    localStorage.setItem('maxTaskId', newId.toString());
    return newId;
  };

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDate(convertToHTMLDate(existingTask.date)); // Convertir la date pour l'input HTML
      setHeure(existingTask.heure);
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Titre :", title);
    console.log("Description :", description);
    console.log("Date :", date);
    console.log("Heure :", heure);

   

    const updatedTask: Task = {
      id: existingTask ? existingTask.id : getNewTaskId(), // Utilisation du compteur pour générer l'ID
      title,
      description,
      date: convertToDisplayDate(date), // Convertir la date pour le stockage
      heure,
      status: existingTask ? existingTask.status : 0,
    };

    onAddTask(updatedTask);
    onClose();
  };

  return (
    <div className="task-form-page">
      <div className="form-container">
        <h2 className="form-title">{existingTask ? 'Update Task' : 'Add task'}</h2>
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
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {existingTask ? 'Update' : ' Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
