import { Request, Response } from "express";
import Todo from "../models/Todo";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error: any) {
    // Dodajemy typ 'any' do 'error'
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const todo = new Todo({
    title: req.body.title,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error: any) {
    // Dodajemy typ 'any' do 'error'
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error: any) {
    // Dodajemy typ 'any' do 'error'
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (error: any) {
    // Dodajemy typ 'any' do 'error'
    res.status(500).json({ message: error.message });
  }
};
