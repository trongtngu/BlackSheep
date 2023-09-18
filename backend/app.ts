import express, {Request, Response} from 'express';
import { initializeDatabase } from './db/initDB';
const bcrypt = require('bcrypt');
import sqlite3 from 'sqlite3'
const app = express();
app.use(express.json());
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

app.post('/api/user/signup', async (req, res) =>{
  
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // The number 10 here is the saltRounds, you can adjust it if needed

    // Use parameterized queries
    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    db.run(query, [username, email, hashedPassword], function(err: Error | null) {
      db.close();

      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }

      res.status(200).send({ message: "Successful Signup" });
    });

  } catch (error) {
    db.close();
    res.status(500).send({ error: "An error occurred during signup." });
  }
})

app.post('/api/user/login', async (req, res) =>{
  
  const email = req.body.email;
  const password = req.body.password;

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  try {
    // Use parameterized queries
    const query = `SELECT password FROM users WHERE email = ?`;

    db.get(query, [email], async (err: Error | null , row: {password: string}) => {

      if (err) {
        db.close();
        res.status(500).send({ error: err.message });
        return;
      }

      if (!row) {
        db.close();
        res.status(404).send({error: "User not found"})
        return;
      }

      const storedHashedPassword = row.password;

      const isMatch = await bcrypt.compare(password, storedHashedPassword);

      if (isMatch) {
        // Passwords match
        const getUserIdQuery = `SELECT id FROM users WHERE email=(?)`
        db.get(getUserIdQuery, [email], async (err: Error | null, row: {id: number}) =>{
          db.close();
          if (err) {
            res.status(500).send({error: "Could not find user ID"});
            return;
          }
          
          const userID = row.id;
          res.status(200).send({ message: "Login successful", userID: userID});
        })
        
      } else {
        // Passwords don't match
        db.close();
        res.status(401).send({ error: "Invalid password" });
      }
    });

  } catch (error) {
    db.close();
    res.status(500).send({ error: "An error occurred during login." });
  }
})

/**USER PLANS */

app.get("/api/templates", (req, res) => {
  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");
  console.log("I RAN")
  try {
    const query = `SELECT * FROM base_templates`;

    db.all(query, (err: Error | null, rows: Array<any>) => {
      db.close();
  
      if (err) {
        res.status(500).send({error: err.message})
        return;
      }
  
      res.status(200).send(rows)
    })
  } catch (err) {
    res.status(500).send({error: "Could not fetch templates"})
  }
  
}) 
app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000/")
})