import * as sqlite3 from 'sqlite3';

export const initializeDatabase = () => {
    const db = new sqlite3.Database("./db/papaya.db");
    db.serialize(() => {
        // Users table
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)");

        // Base exercises table
        db.run("CREATE TABLE IF NOT EXISTS base_exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, exerciseName TEXT, exerciseDetails TEXT)");

        // Base templates table
        db.run("CREATE TABLE IF NOT EXISTS base_templates (id INTEGER PRIMARY KEY AUTOINCREMENT, templateName TEXT, templateDetails TEXT)");

        // Base workouts table (which references base_templates)
        db.run(`CREATE TABLE IF NOT EXISTS base_workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            workoutName TEXT, 
            workoutDetails TEXT,
            templateID INTEGER,
            FOREIGN KEY(templateID) REFERENCES base_templates(id)
        )`);

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

        // Base Template Information table (which references base_templates)
        db.run(`CREATE TABLE IF NOT EXISTS base_template_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            templateID INTEGER,
            duration TEXT,
            programLevel TEXT,
            minimumDaysCommitment INTEGER,
            FOREIGN KEY(templateID) REFERENCES base_templates(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS user_templates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userID INTEGER,
            templateName TEXT,
            templateDetails TEXT,
            FOREIGN KEY(userID) REFERENCES users(id)
        )`);

    })

    // Inserting data
    insert_data_full_body(db);
    insert_data_pull_day(db);
    insert_data_push_day(db);
    insert_data_legs_day(db);
    insert_base_template_info_data(db);

    // Closing the database
    db.close();
};


const insert_base_template_info_data = (db: sqlite3.Database) => {
    // Error handler function
    const handleError = (context: string, err: Error | null) => {
        if (err) {
            console.error(`Error ${context}:`, err.message);
        }
    };

    // A function to insert template info
    const insertInfo = (templateName: string, minimumDaysCommitment: number) => {
        db.get("SELECT id FROM base_templates WHERE templateName = ?", [templateName], (err, row:{id: number}) => {
            handleError(`fetching ID for ${templateName}`, err);
            if (row) {
                const templateId = row.id;
                db.run("INSERT INTO base_template_info (templateID, duration, programLevel, minimumDaysCommitment) VALUES (?, ?, ?, ?)",
                    [templateId, '6 weeks', 'All Levels', minimumDaysCommitment],
                    (err) => {
                        handleError(`inserting into base_template_info for ${templateName}`, err);
                    }
                );
            }
        });
    };

    // Insert info for 'Full Body' and 'Push Pull Legs'
    insertInfo('Full Body', 1);
    insertInfo('Push Pull Legs', 3);
}

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

    // Insert 'Full Body' template
    db.run("INSERT INTO base_templates (templateName, templateDetails) VALUES (?, ?)",
        ['Full Body', 'A workout plan that targets all muscle groups in a single session. Don\'t have to worry about missing a body part for the week.'],
        function (err) {
            handleError("inserting into base_templates", err);

            const templateId = this.lastID;

            // Insert 'FULL BODY' workout with templateId
            db.run("INSERT INTO base_workouts (workoutName, workoutDetails, templateID) VALUES (?, ?, ?)",
                ['FULL BODY', 'A complete body workout', templateId],
                function (err) {
                    handleError("inserting into base_workouts", err);

                    const workoutId = this.lastID;

                    exercises.forEach(([exerciseName, exerciseDetails]) => {
                        db.run("INSERT OR IGNORE INTO base_exercises (exerciseName, exerciseDetails) VALUES (?, ?)", [exerciseName, exerciseDetails], function (err) {
                            handleError(`inserting ${exerciseName} into base_exercises`, err);

                            db.get(`SELECT id FROM base_exercises WHERE exerciseName = ? AND exerciseDetails = ?`, [exerciseName, exerciseDetails], (err, row: { id: number }) => {
                                handleError(`fetching ID for ${exerciseName}`, err);

                                const exerciseId = row.id;

                                // Assuming sets and reps are the same for all exercises in this example.
                                let sets = 3;
                                let reps = 10;

                                db.run("INSERT INTO base_workout_exercise_details (workoutID, exerciseID, sets, reps) VALUES (?, ?, ?, ?)", [workoutId, exerciseId, sets, reps], function (err) {
                                    handleError(`inserting details for ${exerciseName}`, err);
                                });
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

    // Insert 'Push Pull Legs' template
    db.run("INSERT INTO base_templates (templateName, templateDetails) VALUES (?, ?)",
        ['Push Pull Legs', 'A versatile workout split targeting different muscle groups on different days for balanced development.'],
        function (err) {
            handleError("inserting into base_templates", err);

            const templateId = this.lastID;

            // Insert 'PULL' workout with templateId
            db.run("INSERT INTO base_workouts (workoutName, workoutDetails, templateID) VALUES (?, ?, ?)",
                ['PULL', 'Pull focused workout', templateId],
                function (err) {
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

    // Get the 'Push Pull Legs' template ID
    db.get(`SELECT id FROM base_templates WHERE templateName = ?`, ['Push Pull Legs'], (err, row: { id: number }) => {
        handleError("fetching ID for Push Pull Legs template", err);

        const templateId = row.id;

        // Insert 'PUSH' workout with templateId
        db.run("INSERT INTO base_workouts (workoutName, workoutDetails, templateID) VALUES (?, ?, ?)",
            ['PUSH', 'Push focused workout', templateId],
            function (err) {
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

    // Get the 'Push Pull Legs' template ID
    db.get(`SELECT id FROM base_templates WHERE templateName = ?`, ['Push Pull Legs'], (err, row: { id: number }) => {
        handleError("fetching ID for Push Pull Legs template", err);

        const templateId = row.id;

        // Insert 'LEGS' workout with templateId
        db.run("INSERT INTO base_workouts (workoutName, workoutDetails, templateID) VALUES (?, ?, ?)",
            ['LEGS', 'Leg focused workout', templateId],
            function (err) {
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
    });
};


