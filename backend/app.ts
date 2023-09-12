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

  const query: string = `
  SELECT 
    bw.workoutName AS workout_name,
    be.exerciseName AS exercise_name,
    bed.sets,
    bed.reps
  FROM base_workout_exercise_details bed
  JOIN base_workouts bw ON bed.workoutID = bw.id
  JOIN base_exercises be ON bed.exerciseID = be.id
  WHERE bed.workoutID = ?`;

  
  db.all(query, [workoutId], (err: Error | null, rows: Array<any>) => {
    db.close();

    if (err) {
      res.status(500).send({error: err.message});
      return;
    }

    res.status(200).send(rows);
  });
});

app.get('/api/workout', (req, res) => {

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  const query: string = `
  SELECT 
    id AS workout_id,
    workoutName AS workout_name
  FROM base_workouts`;
  
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