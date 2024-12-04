// TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { Task } from '../../data/tasks';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onClose: () => void;
  existingTask: Task | null;  // Nouvelle prop pour la tâche existante
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose, existingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");

  // Remplir les champs du formulaire si une tâche existante est passée
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDate(existingTask.date);
      setHeure(existingTask.heure);
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !heure) {
      alert("All informations please");
      return;
    }

    // Crée ou met à jour la tâche avec un ID unique
    const updatedTask: Task = {
      id: existingTask ? existingTask.id : Date.now(),  // Si c'est une modification, on garde l'ID existant
      title,
      description,
      date,
      heure,
      status: existingTask ? existingTask.status : 0, // Conserver le statut si existant
    };

    onAddTask(updatedTask); // Passe la tâche au composant parent
    onClose(); // Fermer la pop-up après l'ajout ou la modification
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
