// src/controllers/todoController.ts

import { Request, Response } from 'express';
import { Todo, TodoStatus } from '../models/todoModel';
import fs from 'fs';


// Beispiel-Daten für die Todos (initial leer)
let todos: Todo[] = [];

// Controller-Funktion zum Erstellen eines neuen Todos
export const createTodo = (req: Request, res: Response): void => {
  const { todo, deadline, assignee, owner, status } = req.body;

  // Erzeugt eine eindeutige ID für das Todo
  const id: number = todos.length + 1;

  // Neues Todo-Objekt erstellen
  const newTodo: Todo = { id, todo, deadline, assignee, owner, status };

  // Todo zur Liste hinzufügen
  todos.push(newTodo);

  // Erfolgsantwort zurücksenden
  res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
};

// Controller-Funktion zum Lesen aller Todos
export const getAllTodos = (req: Request, res: Response): void => {
  const filePath = './data/todos.json';

  // Lesen der JSON-Datei
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    try {
      // Parsen der JSON-Daten
      const todos = JSON.parse(data);
      // Senden der Todos als Antwort
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing JSON file' });
    }
  });
};
 


// Controller-Funktion zum Lesen eines bestimmten Todos anhand der ID
export const getTodoById = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const filePath = './data/todos.json';
  

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    try {
      // Parsen der JSON-Daten
      const todos = JSON.parse(data).todos

      // Senden der Todos als Antwort
      console.log(todos)

      const todo: Todo | undefined = todos.find((t: any) => t.id === id);
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
      } else {
        res.status(200).json({ todo });
      }
    
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing JSON file' });
    }
  });


  // Todo mit der entsprechenden ID suchen
  
  

  


}

// Controller-Funktion zum Aktualisieren eines Todos anhand der ID
export const updateTodo = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const { todo, deadline, assignee, owner, status } = req.body;

  // Todo mit der entsprechenden ID suchen
  const index: number = todos.findIndex((t) => t.id === id);
  const filePath = './data/todos.json';

  // Lesen der JSON-Datei
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    try {
      // Parsen der JSON-Daten
      const todos = JSON.parse(data).todos;
      // Senden der Todos als Antwort
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing JSON file' });
    }
  });

  if (index === -1) {
    res.status(404).json({ message: 'Todo not found' });
  } else {
    // Todo aktualisieren
    todos[index] = { id, todo, deadline, assignee, owner, status };
    res.status(200).json({ message: 'Todo updated successfully', todo: todos[index] });
  }
};

// Controller-Funktion zum Löschen eines Todos anhand der ID
export const deleteTodo = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const filePath = './data/todos.json';

  // Lesen der JSON-Datei
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    try {
      // Parsen der JSON-Daten
      const todos = JSON.parse(data).todos;
      // Senden der Todos als Antwort
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing JSON file' });
    }
  });

  // Todo mit der entsprechenden ID suchen und entfernen
  todos = todos.filter((t) => t.id !== id);

  res.status(200).json({ message: 'Todo deleted successfully' });
};
