
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  isPriority: boolean;
  isRecurring: boolean;
  time?: string; // Optional time in format HH:MM
  createdAt: string;
  completedAt?: string;
}
