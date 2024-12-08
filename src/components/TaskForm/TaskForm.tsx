import React, { useState, useEffect } from 'react';
import { Task } from '../../data/tasks';

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

  // Fonction pour convertir dd/MM/yyyy en yyyy-MM-dd
  const convertToHTMLDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Fonction pour convertir yyyy-MM-dd en dd/MM/yyyy
  const convertToDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Fonction pour obtenir un nouvel ID unique en utilisant un compteur
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

    if (!title || !description || !date || !heure) {
      alert("Toutes les informations sont requises");
      return;
    }

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
        <h2 className="form-title">{existingTask ? 'Modifier la Tâche' : 'Nouvelle Tâche'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-textarea"
            placeholder="Description"
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
              Annuler
            </button>
            <button type="submit" className="submit-btn">
              {existingTask ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
