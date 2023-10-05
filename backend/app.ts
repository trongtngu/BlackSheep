import express, {Request, Response} from 'express';
import { initializeDatabase } from './db/initDB';
const bcrypt = require('bcrypt');
import sqlite3 from 'sqlite3'
import fs from 'fs'

const app = express();
app.use(express.json());


// Only runs if database does not already exist
fs.access('./db/papaya.db', fs.constants.F_OK, (err) => {
    if (err) {
      initializeDatabase();
      console.log("DB Initialised")
    } else {
      console.log('DB exists - did not initialise');
    }
});

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

/**BASE PLANS */
app.get("/api/templates/:templateID", (req, res) => {
  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");
  
  const targetTemplateID = req.params.templateID;

  try {
    const query = `
      SELECT duration, programLevel, minimumDaysCommitment FROM base_template_info
      WHERE templateID = (?)
    `;

    type infoRow = {
      duration: string;
      programLevel: string;
      minimumDaysCommitment: string;
    }

    db.get(query, [targetTemplateID], async (err: Error | null, row: infoRow) =>{
      db.close();
      if (err) {
        console.error("Database Error:", err);  // Log the actual error
        res.status(500).send({error: "Could not find template info"});
        return;
      } else if (!row) {
        res.status(404).send({error: "Template not found"});
        return;
      } else {
        res.status(200).send(row);
      }
      
    })
  } catch (err) {
    res.status(500).send({error: "Could not fetch templates"})
  }
  
}) 

app.get("/api/templates", (req, res) => {
  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");
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

/** USER TEMPLATES */
app.get("/api/createWorkout/:userID/:templateID", (req, res) => {

  interface BaseWorkoutExerciseDetail {
    id: number;
    workoutID: number;
    exerciseID: number;
    sets: number;
    reps: number;
  }

  const db: sqlite3.Database = new sqlite3.Database("./db/papaya.db");

  const userID = req.params.userID;
  const templateID = req.params.templateID;

  try {
    // 1. Copy base_template to user_templates
    const copyBaseTemplate = `INSERT INTO user_templates (userID, templateName, templateDetails) 
                              SELECT ?, templateName, templateDetails FROM base_templates WHERE id = ?`;
    
    db.run(copyBaseTemplate, [userID, templateID], function(err) {
      if (err) {
        res.status(500).send({error: err.message});
        return;
      }

      const userTemplateID = this.lastID;

      // 2. Insert into user_workouts using the new userTemplateID
      const insertIntoUserWorkouts = `INSERT INTO user_workouts (userID, userTemplateID, workoutName, workoutDetails)
                                     SELECT ?, ?, workoutName, workoutDetails FROM base_workouts WHERE templateID = ?`;

      db.run(insertIntoUserWorkouts, [userID, userTemplateID, templateID], function(err) {
        if (err) {
          res.status(500).send({error: err.message});
          return;
        }

        const userWorkoutID = this.lastID; 

        // 3. Fetch and insert exercises as originally done
        const fetchExercises = `SELECT * FROM base_workout_exercise_details WHERE workoutID IN (SELECT id FROM base_workouts WHERE templateID = ?)`;

        db.all(fetchExercises, [templateID], (err, rows: BaseWorkoutExerciseDetail[]) => {
          if (err) {
            res.status(500).send({error: err.message});
            return;
          }

          // Insert exercises into user tables
          rows.forEach(row => {
            db.run(`INSERT INTO user_workout_exercises (userWorkoutID, exerciseID) VALUES (?, ?)`,
                   [userWorkoutID, row.exerciseID], function(err) {
              if (err) {
                res.status(500).send({error: err.message});
                return;
              }

              const userWorkoutExerciseID = this.lastID; 

              db.run(`INSERT INTO user_workout_exercise_details (userWorkoutExerciseID, sets, reps)
                      VALUES (?, ?, ?)`, [userWorkoutExerciseID, row.sets, row.reps], (err) => {
                if (err) {
                  res.status(500).send({error: err.message});
                  return;
                }
              });
            });
          });

          res.status(200).send({success: true, message: "Workout created successfully!"});
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({error: "Could not create new template"});
  } finally {
    db.close();
  }
});

app.get("/api/userWorkouts/:userID/template/:templateID", (req, res) => {
  console.log("[REQ] Getting User template Details")

  const userID = req.params.userID;
  const templateID = req.params.templateID;
  const db = new sqlite3.Database("./db/papaya.db");

  try {
    const query = `SELECT * FROM user_workouts WHERE userID = ${userID} and userTemplateID =${templateID}`;

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

app.get("/api/userTemplates/:userID", (req, res) => {
  console.log("[REQ] Getting user's templates")

  const userID = req.params.userID;
  const db = new sqlite3.Database("./db/papaya.db"); // Connect to the database

  try {
      const query = `SELECT * FROM user_templates WHERE userID = ?`;

      db.all(query, [userID], (err, rows) => {
          if (err) {
              throw err;  // Will be caught by the catch block
          }

          res.status(200).send(rows);  // Send the fetched rows (templates) as response
      });

  } catch (error) {
      console.error(error);
      res.status(500).send({error: "Could not get user's templates"});
  } finally {
      db.close();  // Close the database connection
  }
});

/** User Creates a new workout using a template */
app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000/")
})

