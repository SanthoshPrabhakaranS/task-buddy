export interface Task {
  userId?: string;
  id: string;
  title: string;
  dueOn: string;
  status: string;
  category: string;
  description?: string;
  attachment?: File | any;
  activity?: Activity[];
}

export interface Activity {
  id?: string;
  updatedAt: string;
  action: string;
}

export enum TaskStatus {
  TODO = 'TO-DO',
  IN_PROGRESS = 'IN-PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum FormState {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}
