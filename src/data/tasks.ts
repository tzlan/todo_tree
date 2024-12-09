export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    heure: string; 
    status: number;
}

export const tasks: Task[] = [
    { id: 1, title: "Todo List", description: "Create todo list in figma", date: "02/12/2024", heure: "12:31", status: 0 },
    { id: 2, title: "Clean Duboni", description: "Clean house", date: "02/12/2024", heure: "12:33", status: 1 },
    { id: 3, title: "Buy groceries", description: "Purchase fruits and vegetables", date: "02/12/2024", heure: "13:00", status: 1 },
    { id: 4, title: "Do laundry", description: "Wash clothes", date: "02/12/2024", heure: "14:00", status: 1 },
    { id: 5, title: "Study React", description: "Study React documentation", date: "02/12/2024", heure: "15:00", status: 0 },
    { id: 6, title: "Complete project report", description: "Write project report for work", date: "02/12/2024", heure: "16:30", status: 1 },
    { id: 7, title: "Watch tutorial", description: "Watch video on advanced React topics", date: "02/12/2024", heure: "18:00", status: 0 },
    { id: 8, title: "Take out trash", description: "Take out the trash to the dumpster", date: "02/12/2024", heure: "19:00", status: 0 },
  

];

