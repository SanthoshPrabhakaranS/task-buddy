# Task Management Application

A responsive task management application built with **React**, **TypeScript**, **Firebase**, and **Context API**. This application allows users to efficiently create, organize, and track their tasks with an intuitive user interface and powerful features.

## Features

### 1. **User Authentication**

- Sign in with **Google** using **Firebase Authentication**.

### 2. **Task Management**

- Create, edit, and delete tasks.
- Categorize tasks (e.g., work, personal) and add tags for better organization.
- Set due dates for tasks.
- **Drag-and-drop** functionality to rearrange tasks.
- Sort tasks by due date (ascending/descending).

### 3. **Batch Actions**

- Perform batch actions like deleting multiple tasks or marking them as complete.

### 4. **Task History and Activity Log**

- Track changes made to tasks (creation, edits, deletions).
- Display an activity log for each task.

### 5. **File Attachments**

- Attach files or documents to tasks.
- File upload feature in the task creation/editing form.
- Display attached files in the task detail view.

### 6. **Filter and Search**

- Filter tasks by tags, category, and date range.
- Search tasks by title.

### 7. **Board/List View**

- Switch between **Kanban-style board view** and **list view** for tasks.

### 8. **Responsive Design**

- Fully responsive design with a **desktop-first approach**.
- Seamlessly adapts to mobile, tablet, and desktop screens.

## Technologies Used

- **Frontend**: React, TypeScript
- **State Management**: Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (for task storage)
- **Styling**: CSS Modules or Tailwind
- **Drag-and-Drop**: `@dnd-kit` library

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the App:
   ```bash
   npm run dev
   ```
