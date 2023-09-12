import * as sqlite3 from 'sqlite3';

export const initializeDatabase = () => {
    const db = new sqlite3.Database("./db/papaya.db");
    db.serialize(() => {
        // Users table
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

        // Base workouts and exercises tables
        db.run("CREATE TABLE IF NOT EXISTS base_workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutName TEXT, workoutDetails TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS base_exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, exerciseName TEXT, exerciseDetails TEXT)");

        // Base workout exercise details table
        db.run(`CREATE TABLE IF NOT EXISTS base_workout_exercise_details (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workoutID INTEGER,
                exerciseID INTEGER,
                sets INTEGER,
                reps INTEGER,
                FOREIGN KEY(workoutID) REFERENCES base_workouts(id),
                FOREIGN KEY(exerciseID) REFERENCES base_exercises(id)
            )`);

        // User workouts table
        db.run(`CREATE TABLE IF NOT EXISTS user_workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userID INTEGER,
                baseWorkoutID INTEGER,
                workoutName TEXT,
                workoutDetails TEXT,
                FOREIGN KEY(userID) REFERENCES users(id),
                FOREIGN KEY(baseWorkoutID) REFERENCES base_workouts(id)
            )`);

        // User workout exercises table
        db.run(`CREATE TABLE IF NOT EXISTS user_workout_exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userWorkoutID INTEGER,
                exerciseID INTEGER,
                FOREIGN KEY(userWorkoutID) REFERENCES user_workouts(id),
                FOREIGN KEY(exerciseID) REFERENCES base_exercises(id)
            )`);

        // Workout exercise details table for user-specific details
        db.run(`CREATE TABLE IF NOT EXISTS user_workout_exercise_details (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userWorkoutExerciseID INTEGER,
                sets INTEGER,
                reps INTEGER,
                FOREIGN KEY(userWorkoutExerciseID) REFERENCES user_workout_exercises(id)
            )`);



    })

    insert_data_full_body(db)
    insert_data_pull_day(db)        
    insert_data_push_day(db)
    insert_data_legs_day(db)
    db.close()
};

const insert_data_full_body = (db: sqlite3.Database) => {
    const exercises: Array<Array<string>> = [
        ["Barbell Bench Press", "Chest Push"],
        ["Cable Chest Flies", "Chest Fly"],
        ["Hack Squats", "Leg Quad"],
        ["Hamstring Curls", "Leg Hamstring"],
        ["Lat Pulldowns", "Back Vertical"],
        ["Machine Rows", "Back Horizontal"],
        ["Lateral Raises", "Delt Side"],
        ["Rope Pushdown", "Tricep Isolation"],
        ["Dumbell Curls", "Bicep Isolation"]
    ];

    // Error handler function
    const handleError = (context: string, err: Error | null) => {
        if (err) {
            console.error(`Error ${context}:`, err.message);
        }
    };

    // Insert 'FULL BODY' workout
    db.run("INSERT INTO base_workouts (workoutName, workoutDetails) VALUES (?, ?)", ['FULL BODY', 'A complete body workout'], function (err) {
        handleError("inserting into base_workouts", err);

        const workoutId = this.lastID;

        exercises.forEach(([exerciseName, exerciseDetails]) => {
            db.run("INSERT OR IGNORE INTO base_exercises (exerciseName, exerciseDetails) VALUES (?, ?)", [exerciseName, exerciseDetails], function (err) {
                handleError(`inserting ${exerciseName} into base_exercises`, err);

                db.get(`SELECT id FROM base_exercises WHERE exerciseName = ? AND exerciseDetails = ?`, [exerciseName, exerciseDetails], (err, row: { id: number }) => {
                    handleError(`fetching ID for ${exerciseName}`, err);

                    const exerciseId = row.id;

                    // Assuming sets and reps are the same for all exercises in this example.
                    // However, you can use conditionals or a switch case to vary them based on the exercise if needed.
                    let sets = 3;
                    let reps = 10;

                    db.run("INSERT INTO base_workout_exercise_details (workoutID, exerciseID, sets, reps) VALUES (?, ?, ?, ?)", [workoutId, exerciseId, sets, reps], function (err) {
                        handleError(`inserting details for ${exerciseName}`, err);
                    });
                });
            });
        });
    });
};


const insert_data_pull_day = (db: sqlite3.Database) => {
    const pullExercises: Array<[string, string, number, number]> = [
        ["Deadlifts", "Primary compound lift", 1, 5],
        ["Barbell rows", "Primary rowing exercise", 4, 5],
        ["Pulldowns", "Vertical pulling movement", 3, 10],
        ["Seated cable rows", "Rowing movement", 3, 10],
        ["Face pulls", "Rear deltoid and upper trap emphasis", 5, 15],
        ["Hammer curls", "Brachialis and forearm emphasis", 4, 10],
        ["Dumbbell curls", "Bicep isolation", 4, 10]
    ];

    // Error handler function
    const handleError = (context: string, err: Error | null) => {
        if (err) {
            console.error(`Error ${context}:`, err.message);
        }
    };

    // Insert 'PULL' workout
    db.run("INSERT INTO base_workouts (workoutName, workoutDetails) VALUES (?, ?)", ['PULL', 'Pull focused workout'], function (err) {
        handleError("inserting into base_workouts", err);

        const workoutId = this.lastID;

        pullExercises.forEach(([exerciseName, exerciseDetails, sets, reps]) => {
            db.run("INSERT OR IGNORE INTO base_exercises (exerciseName, exerciseDetails) VALUES (?, ?)", [exerciseName, exerciseDetails], function (err) {
                handleError(`inserting ${exerciseName} into base_exercises`, err);

                db.get(`SELECT id FROM base_exercises WHERE exerciseName = ? AND exerciseDetails = ?`, [exerciseName, exerciseDetails], (err, row: { id: number }) => {
                    handleError(`fetching ID for ${exerciseName}`, err);

                    const exerciseId = row.id;

                    db.run("INSERT INTO base_workout_exercise_details (workoutID, exerciseID, sets, reps) VALUES (?, ?, ?, ?)", [workoutId, exerciseId, sets, reps], function (err) {
                        handleError(`inserting details for ${exerciseName}`, err);
                    });
                });
            });
        });
    });
};


const insert_data_push_day = (db: sqlite3.Database) => {
    const pushExercises: Array<[string, string, number, number]> = [
        ["Bench press", "Primary chest compound lift", 4, 5],
        ["Overhead press", "Primary shoulder compound lift", 4, 5],
        ["Incline dumbbell press", "Upper chest emphasis", 3, 10],
        ["Triceps pushdowns", "Tricep isolation", 3, 10],
        ["Lateral raises", "Side deltoid emphasis", 3, 17],
        ["Overhead triceps extensions", "Long head tricep emphasis", 3, 10],
        ["Lateral raises", "Side deltoid emphasis in superset", 3, 17]
    ];

    // Error handler function
    const handleError = (context: string, err: Error | null) => {
        if (err) {
            console.error(`Error ${context}:`, err.message);
        }
    };

    // Insert 'PUSH' workout
    db.run("INSERT INTO base_workouts (workoutName, workoutDetails) VALUES (?, ?)", ['PUSH', 'Push focused workout'], function (err) {
        handleError("inserting into base_workouts", err);

        const workoutId = this.lastID;

        pushExercises.forEach(([exerciseName, exerciseDetails, sets, reps]) => {
            db.run("INSERT OR IGNORE INTO base_exercises (exerciseName, exerciseDetails) VALUES (?, ?)", [exerciseName, exerciseDetails], function (err) {
                handleError(`inserting ${exerciseName} into base_exercises`, err);

                db.get(`SELECT id FROM base_exercises WHERE exerciseName = ? AND exerciseDetails = ?`, [exerciseName, exerciseDetails], (err, row: { id: number }) => {
                    handleError(`fetching ID for ${exerciseName}`, err);

                    const exerciseId = row.id;

                    db.run("INSERT INTO base_workout_exercise_details (workoutID, exerciseID, sets, reps) VALUES (?, ?, ?, ?)", [workoutId, exerciseId, sets, reps], function (err) {
                        handleError(`inserting details for ${exerciseName}`, err);
                    });
                });
            });
        });
    });
};


const insert_data_legs_day = (db: sqlite3.Database) => {
    const legsExercises: Array<[string, string, number, number]> = [
        ["Squat", "Primary compound lift for legs", 2, 5],
        ["Romanian Deadlift", "Hamstring and glute emphasis", 3, 10],
        ["Leg press", "Compound movement for quads and hamstrings", 3, 10],
        ["Leg curls", "Hamstring isolation", 3, 10],
        ["Calf raises", "Calf muscle isolation", 5, 10]
    ];

    // Error handler function
    const handleError = (context: string, err: Error | null) => {
        if (err) {
            console.error(`Error ${context}:`, err.message);
        }
    };

    // Insert 'LEGS' workout
    db.run("INSERT INTO base_workouts (workoutName, workoutDetails) VALUES (?, ?)", ['LEGS', 'Leg focused workout'], function (err) {
        handleError("inserting into base_workouts", err);

        const workoutId = this.lastID;

        legsExercises.forEach(([exerciseName, exerciseDetails, sets, reps]) => {
            db.run("INSERT OR IGNORE INTO base_exercises (exerciseName, exerciseDetails) VALUES (?, ?)", [exerciseName, exerciseDetails], function (err) {
                handleError(`inserting ${exerciseName} into base_exercises`, err);

                db.get(`SELECT id FROM base_exercises WHERE exerciseName = ? AND exerciseDetails = ?`, [exerciseName, exerciseDetails], (err, row: { id: number }) => {
                    handleError(`fetching ID for ${exerciseName}`, err);

                    const exerciseId = row.id;

                    db.run("INSERT INTO base_workout_exercise_details (workoutID, exerciseID, sets, reps) VALUES (?, ?, ?, ?)", [workoutId, exerciseId, sets, reps], function (err) {
                        handleError(`inserting details for ${exerciseName}`, err);
                    });
                });
            });
        });
    });
};


