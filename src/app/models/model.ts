export interface Task {
  id: string;
  summary: string;
  createDate: string;
  dueDate: string;
  priority: string;
  status: string;
  note: string;
}

export interface DataConfirm {
  type?: string;
  icon?: string;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  iconCancel?: string;
  sizeConfirm?: string;
  createTask?: boolean;
  updateTask?: boolean;
  task?: Task;
}
