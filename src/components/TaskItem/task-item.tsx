import { Task } from "../../data/tasks";
import styles from "./task-item.module.css";
import { FaCheck, FaTrash, FaArrowLeft, FaPen } from "react-icons/fa";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onStatusChange: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange, onEdit }) => {
    return (
        <div className={styles.taskItem}>
            <div className={styles.taskContent}>
                <div className={styles.titleRow}>
                    <h3 className={styles.taskTitle}>{task.title}</h3>
                    {task.status === 0 && (
                        <button 
                            className={styles.editButton}
                            onClick={() => onEdit(task)}
                        >
                            <FaPen className={styles.editIcon} />
                        </button>
                    )}
                </div>
                <p className={styles.taskDescription}>{task.description}</p>
                <p className={styles.taskDate}>
                    {task.hour}, {task.date}
                </p>
            </div>
            <div className={styles.actions}>
                {task.status === 0 ? (
                    <>
                        <button 
                            className={styles.actionButton} 
                            onClick={() => onStatusChange(task.id)}
                        >
                            <FaCheck className={styles.checkIcon} />
                        </button>
                        <button 
                            className={styles.actionButton} 
                            onClick={() => onDelete(task.id)}
                        >
                            <FaTrash className={styles.deleteIcon} />
                        </button>
                    </>
                ) : (
                    <button 
                        className={styles.actionButton} 
                        onClick={() => onStatusChange(task.id)}
                    >
                        <FaArrowLeft className={styles.backIcon} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
