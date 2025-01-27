import { assets } from '../assets';

export const CATEGORIES = [
  {
    id: 1,
    title: 'WORK',
  },
  {
    id: 2,
    title: 'PERSONAL',
  },
];

export const TABLE_HEADERS = [
  {
    id: 1,
    title: 'Task Name',
  },
  {
    id: 2,
    title: 'Due on',
  },
  {
    id: 3,
    title: 'Task Status',
  },
  {
    id: 4,
    title: 'Task Category',
  },
];

export const TASK_STATUS = [
  {
    id: 1,
    title: 'TO-DO',
  },
  {
    id: 2,
    title: 'IN-PROGRESS',
  },
  {
    id: 3,
    title: 'COMPLETED',
  },
];

export const TASK_ACTIONS = [
  {
    id: 1,
    title: 'Edit',
    icon: assets.EditImg,
  },
  {
    id: 2,
    title: 'Delete',
    icon: assets.DeleteImg,
  },
];
