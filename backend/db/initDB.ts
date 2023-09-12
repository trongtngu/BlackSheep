import * as sqlite3 from 'sqlite3';

export const initializeDatabase = () => {
    const db = new sqlite3.Database("./db/papaya.db");
    
    // Creating Tables
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS workout_exercise_details (detailid INTEGER PRIMARY KEY AUTOINCREMENT, exerciseid INTEGER, sets INTEGER, reps INTEGER, FOREIGN KEY(exerciseid) REFERENCES exercises(id))");
        db.run("CREATE TABLE IF NOT EXISTS workouts_exercises (workoutID INTEGER, detailID INTEGER, PRIMARY KEY (workoutID, detailID), FOREIGN KEY (detailID) REFERENCES workout_exercise_details(detailid), FOREIGN KEY (workoutID) REFERENCES workouts(id))");
    });

    // Creating Full Body Exercises
    insert_data_full_body(db)

    insert_data_push_day(db)
    insert_data_pull_day(db)
    insert_data_legs_day(db)

    db.close()
};

const insert_data_full_body = (db: sqlite3.Database) => {
    const chestExercises: Array<Array<string>> = [
        ["Barbell Bench Press", "Chest Push"],
        ["Cable Chest Flies", "Chest Fly"]
    ]

    const legExercises: Array<Array<string>> = [
        ["Hack Squats", "Leg Quad"],
        ["Hamstring Curls", "Leg Hamstring"]
    ]

    const backExercises: Array<Array<string>> = [
        ["Lat Pulldowns", "Back Vertical"],
        ["Machine Rows", "Back Horizontal"]
    ]

    const sideDeltExercises: Array<Array<string>> = [
        ["Lateral Raises", "Delt Side"]
    ]

    const tricepExercises: Array<Array<string>> = [
        ["Rope Pushdown", "Tricep Isolation"]
    ]

    const bicepExercises: Array<Array<string>> = [
        ["Dumbell Curls", "Bicep Isolation"]
    ]

    // Insert 'FULL BODY' workout
    db.run("INSERT INTO workouts (name, description) VALUES (?, ?)", ['FULL BODY', 'A complete body workout'], function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
            console.error("Error inserting into workouts:", err.message);
            return;
        }

        const workoutId = this.lastID;  // Capture the last inserted ID

        const exercises: Array<Array<string>> = [
            ...chestExercises,
            ...legExercises,
            ...backExercises,
            ...sideDeltExercises,
            ...tricepExercises,
            ...bicepExercises
        ];

        exercises.forEach(([name, description]) => {
            db.run("INSERT OR IGNORE INTO exercises (name, description) VALUES (?, ?)", [name, description], function(err: Error | null) {
                if (err) {
                    console.error("Error inserting into exercises:", err.message);
                    return;
                }

                db.get("SELECT id FROM exercises WHERE name = ? AND description = ?", [name, description], (err: Error | null, row: { id: number }) => {
                    if (err) {
                        console.error("Error fetching exercise ID:", err.message);
                        return;
                    }

                    const exerciseId = row.id;

                    // TODO: Depending on exercise, adjust sets and reps.
                    let sets = 3;
                    let reps = 10;

                    db.run("INSERT INTO workout_exercise_details (exerciseid, sets, reps) VALUES (?, ?, ?)", [exerciseId, sets, reps], function(err: Error | null) {
                        if (err) {
                            console.error("Error inserting into workout_exercise_details:", err.message);
                            return;
                        }

                        const detailId = this.lastID;

                        db.run("INSERT INTO workouts_exercises (workoutID, detailID) VALUES (?, ?)", [workoutId, detailId], (err: Error | null) => {
                            if (err) {
                                console.error("Error linking workout with exercise details:", err.message);
                            }
                        });
                    });
                });
            });
        });
    });
}

const insert_data_pull_day = (db: sqlite3.Database) => {
    const pullExercises: Array<[string, string, number, number]> = [
        ["Deadlifts", "Primary compound lift", 1, 5],
        ["Barbell rows", "Primary rowing exercise", 4, 5],
        ["Pulldowns OR Pullups OR Chinups", "Vertical pulling movement", 3, 10],
        ["Seated cable rows OR Chest supported rows", "Rowing movement", 3, 10],
        ["Face pulls", "Rear deltoid and upper trap emphasis", 5, 15],
        ["Hammer curls", "Brachialis and forearm emphasis", 4, 10],
        ["Dumbbell curls", "Bicep isolation", 4, 10]
    ];

    // Insert 'PULL' workout
    db.run("INSERT INTO workouts (name, description) VALUES (?, ?)", ['PULL', 'Pull focused workout'], function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
            console.error("Error inserting into workouts:", err.message);
            return;
        }

        const workoutId = this.lastID;  // Capture the last inserted ID

        pullExercises.forEach(([name, description, sets, reps]) => {
            // Insert or use existing exercise
            db.run("INSERT OR IGNORE INTO exercises (name, description) VALUES (?, ?)", [name, description], function(err: Error | null) {
                if (err) {
                    console.error("Error inserting into exercises:", err.message);
                    return;
                }

                // Fetch exercise ID
                db.get("SELECT id FROM exercises WHERE name = ? AND description = ?", [name, description], (err: Error | null, row: { id: number }) => {
                    if (err) {
                        console.error("Error fetching exercise ID:", err.message);
                        return;
                    }

                    const exerciseId = row.id;

                    // Insert exercise details
                    db.run("INSERT INTO workout_exercise_details (exerciseid, sets, reps) VALUES (?, ?, ?)", [exerciseId, sets, reps], function(err: Error | null) {
                        if (err) {
                            console.error("Error inserting into workout_exercise_details:", err.message);
                            return;
                        }

                        const detailId = this.lastID;

                        // Link workout with exercise details
                        db.run("INSERT INTO workouts_exercises (workoutID, detailID) VALUES (?, ?)", [workoutId, detailId], (err: Error | null) => {
                            if (err) {
                                console.error("Error linking workout with exercise details:", err.message);
                            }
                        });
                    });
                });
            });
        });
    });
}

const insert_data_push_day = (db: sqlite3.Database) => {
    const pushExercises: Array<[string, string, number, number]> = [
        ["Bench press", "Primary chest compound lift", 4, 5],
        ["Overhead press", "Primary shoulder compound lift", 4, 5],
        ["Incline dumbbell press", "Upper chest emphasis", 3, 10],
        ["Triceps pushdowns", "Tricep isolation", 3, 10],
        ["Lateral raises", "Side deltoid emphasis", 3, 17],  // Note: This is done in a superset, so you may need to adapt this for the database design
        ["Overhead triceps extensions", "Long head tricep emphasis", 3, 10],
        ["Lateral raises", "Side deltoid emphasis in superset", 3, 17]
    ];

    // Insert 'PUSH' workout
    db.run("INSERT INTO workouts (name, description) VALUES (?, ?)", ['PUSH', 'Push focused workout'], function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
            console.error("Error inserting into workouts:", err.message);
            return;
        }

        const workoutId = this.lastID;  // Capture the last inserted ID

        pushExercises.forEach(([name, description, sets, reps]) => {
            // Insert or use existing exercise
            db.run("INSERT OR IGNORE INTO exercises (name, description) VALUES (?, ?)", [name, description], function(err: Error | null) {
                if (err) {
                    console.error("Error inserting into exercises:", err.message);
                    return;
                }

                // Fetch exercise ID
                db.get("SELECT id FROM exercises WHERE name = ? AND description = ?", [name, description], (err: Error | null, row: { id: number }) => {
                    if (err) {
                        console.error("Error fetching exercise ID:", err.message);
                        return;
                    }

                    const exerciseId = row.id;

                    // Insert exercise details
                    db.run("INSERT INTO workout_exercise_details (exerciseid, sets, reps) VALUES (?, ?, ?)", [exerciseId, sets, reps], function(err: Error | null) {
                        if (err) {
                            console.error("Error inserting into workout_exercise_details:", err.message);
                            return;
                        }

                        const detailId = this.lastID;

                        // Link workout with exercise details
                        db.run("INSERT INTO workouts_exercises (workoutID, detailID) VALUES (?, ?)", [workoutId, detailId], (err: Error | null) => {
                            if (err) {
                                console.error("Error linking workout with exercise details:", err.message);
                            }
                        });
                    });
                });
            });
        });
    });
}

const insert_data_legs_day = (db: sqlite3.Database) => {
    const legsExercises: Array<[string, string, number, number]> = [
        ["Squat", "Primary compound lift for legs", 2, 5],
        ["Romanian Deadlift", "Hamstring and glute emphasis", 3, 10],
        ["Leg press", "Compound movement for quads and hamstrings", 3, 10],
        ["Leg curls", "Hamstring isolation", 3, 10],
        ["Calf raises", "Calf muscle isolation", 5, 10]
    ];

    // Insert 'LEGS' workout
    db.run("INSERT INTO workouts (name, description) VALUES (?, ?)", ['LEGS', 'Leg focused workout'], function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
            console.error("Error inserting into workouts:", err.message);
            return;
        }

        const workoutId = this.lastID;  // Capture the last inserted ID

        legsExercises.forEach(([name, description, sets, reps]) => {
            // Insert or use existing exercise
            db.run("INSERT OR IGNORE INTO exercises (name, description) VALUES (?, ?)", [name, description], function(err: Error | null) {
                if (err) {
                    console.error("Error inserting into exercises:", err.message);
                    return;
                }

                // Fetch exercise ID
                db.get("SELECT id FROM exercises WHERE name = ? AND description = ?", [name, description], (err: Error | null, row: { id: number }) => {
                    if (err) {
                        console.error("Error fetching exercise ID:", err.message);
                        return;
                    }

                    const exerciseId = row.id;

                    // Insert exercise details
                    db.run("INSERT INTO workout_exercise_details (exerciseid, sets, reps) VALUES (?, ?, ?)", [exerciseId, sets, reps], function(err: Error | null) {
                        if (err) {
                            console.error("Error inserting into workout_exercise_details:", err.message);
                            return;
                        }

                        const detailId = this.lastID;

                        // Link workout with exercise details
                        db.run("INSERT INTO workouts_exercises (workoutID, detailID) VALUES (?, ?)", [workoutId, detailId], (err: Error | null) => {
                            if (err) {
                                console.error("Error linking workout with exercise details:", err.message);
                            }
                        });
                    });
                });
            });
        });
    });
}
