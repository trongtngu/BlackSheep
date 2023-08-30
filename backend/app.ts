import express, {Request, Response} from 'express';
import { initializeDatabase } from './db/initDB';

import sqlite3 from 'sqlite3'
const app = express();

// initializeDatabase()

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World')
})


app.get('/api/workout/:workoutId', (req, res) => {
  const workoutId: number = parseInt(req.params.workoutId);

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  const query: string = `SELECT 
  w.name AS workout_name,
  e.name AS exercise_name,
  d.sets,
  d.reps
  FROM workouts_exercises we
  JOIN workouts w ON we.workoutID = w.id
  JOIN workout_exercise_details d ON we.detailID = d.detailid
  JOIN exercises e ON d.exerciseid = e.id
  WHERE we.workoutID = ?`;
  
  db.all(query, [workoutId], (err: Error | null, rows: Array<any>) => {
    db.close();

    if (err) {
      res.status(500).send({error: err.message})
      return;
    }

    res.status(200).send(rows)
  })
})

app.get('/api/workout', (req, res) => {

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  const query: string = `
  SELECT 
    id AS workout_id,
    name AS workout_name
  FROM workouts`;
  
  db.all(query, (err: Error | null, rows: Array<any>) => {
    db.close();

    if (err) {
      res.status(500).send({error: err.message})
      return;
    }

    res.status(200).send(rows)
  })
})

app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000/")
})