import React, { useState, useEffect } from 'react';
import { Dumbbell, Calendar, Trophy, ChevronRight, Share2, Check, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface Exercise {
  name: string;
  sets: string;
  completed?: boolean;
}

interface WorkoutDay {
  day: number;
  focus: string;
  exercises: Exercise[];
}

// Complete 21-day training program
const initialTrainingProgram: WorkoutDay[] = [
  {
    day: 1,
    focus: "Chest & Triceps",
    exercises: [
      { name: "Bench Press", sets: "4 sets x 12 reps" },
      { name: "Incline Dumbbell Press", sets: "3 sets x 12 reps" },
      { name: "Tricep Pushdowns", sets: "3 sets x 15 reps" },
      { name: "Chest Flyes", sets: "3 sets x 12 reps" }
    ]
  },
  {
    day: 2,
    focus: "Back & Biceps",
    exercises: [
      { name: "Pull-ups", sets: "4 sets x 8 reps" },
      { name: "Barbell Rows", sets: "3 sets x 12 reps" },
      { name: "Dumbbell Curls", sets: "3 sets x 12 reps" },
      { name: "Lat Pulldowns", sets: "3 sets x 12 reps" }
    ]
  },
  {
    day: 3,
    focus: "Legs & Core",
    exercises: [
      { name: "Squats", sets: "4 sets x 10 reps" },
      { name: "Deadlifts", sets: "4 sets x 8 reps" },
      { name: "Leg Press", sets: "3 sets x 12 reps" },
      { name: "Planks", sets: "3 sets x 60 seconds" }
    ]
  },
  {
    day: 4,
    focus: "Shoulders & Abs",
    exercises: [
      { name: "Military Press", sets: "4 sets x 10 reps" },
      { name: "Lateral Raises", sets: "3 sets x 15 reps" },
      { name: "Front Raises", sets: "3 sets x 12 reps" },
      { name: "Crunches", sets: "3 sets x 20 reps" }
    ]
  },
  {
    day: 5,
    focus: "Full Body Circuit",
    exercises: [
      { name: "Burpees", sets: "3 sets x 12 reps" },
      { name: "Mountain Climbers", sets: "3 sets x 30 seconds" },
      { name: "Push-ups", sets: "3 sets x 15 reps" },
      { name: "Jump Rope", sets: "3 sets x 1 minute" }
    ]
  },
  {
    day: 6,
    focus: "Active Recovery",
    exercises: [
      { name: "Light Jogging", sets: "20 minutes" },
      { name: "Stretching", sets: "15 minutes" },
      { name: "Yoga", sets: "20 minutes" },
      { name: "Foam Rolling", sets: "10 minutes" }
    ]
  },
  {
    day: 7,
    focus: "Rest Day",
    exercises: [
      { name: "Light Walking", sets: "30 minutes" },
      { name: "Stretching", sets: "15 minutes" },
      { name: "Meditation", sets: "10 minutes" }
    ]
  },
  {
    day: 8,
    focus: "Chest & Triceps",
    exercises: [
      { name: "Incline Bench Press", sets: "4 sets x 10 reps" },
      { name: "Dips", sets: "3 sets x 12 reps" },
      { name: "Close-Grip Bench", sets: "3 sets x 12 reps" },
      { name: "Rope Pushdowns", sets: "3 sets x 15 reps" }
    ]
  },
  {
    day: 9,
    focus: "Back & Biceps",
    exercises: [
      { name: "Deadlifts", sets: "4 sets x 8 reps" },
      { name: "Chin-ups", sets: "3 sets x 10 reps" },
      { name: "Hammer Curls", sets: "3 sets x 12 reps" },
      { name: "Face Pulls", sets: "3 sets x 15 reps" }
    ]
  },
  {
    day: 10,
    focus: "Legs & Core",
    exercises: [
      { name: "Front Squats", sets: "4 sets x 10 reps" },
      { name: "Romanian Deadlifts", sets: "3 sets x 12 reps" },
      { name: "Lunges", sets: "3 sets x 12 reps/leg" },
      { name: "Leg Raises", sets: "3 sets x 15 reps" }
    ]
  },
  {
    day: 11,
    focus: "Shoulders & Abs",
    exercises: [
      { name: "Arnold Press", sets: "4 sets x 10 reps" },
      { name: "Upright Rows", sets: "3 sets x 12 reps" },
      { name: "Rear Delt Flyes", sets: "3 sets x 15 reps" },
      { name: "Russian Twists", sets: "3 sets x 20 reps" }
    ]
  },
  {
    day: 12,
    focus: "HIIT Training",
    exercises: [
      { name: "Box Jumps", sets: "4 sets x 10 reps" },
      { name: "Battle Ropes", sets: "3 sets x 30 seconds" },
      { name: "Kettlebell Swings", sets: "3 sets x 15 reps" },
      { name: "Sprints", sets: "5 sets x 30 seconds" }
    ]
  },
  {
    day: 13,
    focus: "Active Recovery",
    exercises: [
      { name: "Swimming", sets: "20 minutes" },
      { name: "Dynamic Stretching", sets: "15 minutes" },
      { name: "Light Cycling", sets: "20 minutes" }
    ]
  },
  {
    day: 14,
    focus: "Rest Day",
    exercises: [
      { name: "Walking", sets: "30 minutes" },
      { name: "Mobility Work", sets: "15 minutes" },
      { name: "Stretching", sets: "15 minutes" }
    ]
  },
  {
    day: 15,
    focus: "Chest & Triceps",
    exercises: [
      { name: "Decline Bench Press", sets: "4 sets x 10 reps" },
      { name: "Cable Flyes", sets: "3 sets x 12 reps" },
      { name: "Skull Crushers", sets: "3 sets x 12 reps" },
      { name: "Diamond Push-ups", sets: "3 sets x failure" }
    ]
  },
  {
    day: 16,
    focus: "Back & Biceps",
    exercises: [
      { name: "T-Bar Rows", sets: "4 sets x 10 reps" },
      { name: "Wide-Grip Pull-ups", sets: "3 sets x failure" },
      { name: "Preacher Curls", sets: "3 sets x 12 reps" },
      { name: "Cable Rows", sets: "3 sets x 12 reps" }
    ]
  },
  {
    day: 17,
    focus: "Legs & Core",
    exercises: [
      { name: "Hack Squats", sets: "4 sets x 10 reps" },
      { name: "Leg Extensions", sets: "3 sets x 15 reps" },
      { name: "Calf Raises", sets: "4 sets x 20 reps" },
      { name: "Hanging Leg Raises", sets: "3 sets x 12 reps" }
    ]
  },
  {
    day: 18,
    focus: "Shoulders & Abs",
    exercises: [
      { name: "Push Press", sets: "4 sets x 8 reps" },
      { name: "Face Pulls", sets: "3 sets x 15 reps" },
      { name: "Lateral Raises", sets: "3 sets x 12 reps" },
      { name: "Plank Variations", sets: "3 sets x 45 seconds" }
    ]
  },
  {
    day: 19,
    focus: "Full Body Power",
    exercises: [
      { name: "Power Cleans", sets: "4 sets x 6 reps" },
      { name: "Box Jumps", sets: "3 sets x 8 reps" },
      { name: "Medicine Ball Slams", sets: "3 sets x 12 reps" },
      { name: "Plyometric Push-ups", sets: "3 sets x 8 reps" }
    ]
  },
  {
    day: 20,
    focus: "Active Recovery",
    exercises: [
      { name: "Light Jogging", sets: "25 minutes" },
      { name: "Dynamic Stretching", sets: "15 minutes" },
      { name: "Mobility Work", sets: "20 minutes" }
    ]
  },
  {
    day: 21,
    focus: "Final Challenge",
    exercises: [
      { name: "Circuit Training", sets: "3 rounds" },
      { name: "AMRAP Challenge", sets: "10 minutes" },
      { name: "Core Challenge", sets: "5 minutes" },
      { name: "Flexibility Work", sets: "15 minutes" }
    ]
  }
];

function App() {
  const [trainingProgram, setTrainingProgram] = useState(() => {
    const saved = localStorage.getItem('workoutProgress');
    return saved ? JSON.parse(saved) : initialTrainingProgram;
  });

  useEffect(() => {
    localStorage.setItem('workoutProgress', JSON.stringify(trainingProgram));
  }, [trainingProgram]);

  const toggleExercise = (dayIndex: number, exerciseIndex: number) => {
    setTrainingProgram((prev: WorkoutDay[]) => {
      const newProgram = prev.map((day: WorkoutDay, idx: number) => {
        if (idx !== dayIndex) return day;
        return {
          ...day,
          exercises: day.exercises.map((exercise: Exercise, exIdx: number) => {
            if (exIdx !== exerciseIndex) return exercise;
            return {
              ...exercise,
              completed: !exercise.completed
            };
          })
        };
      });
      return newProgram;
    });
  };

  const isDayCompleted = (day: WorkoutDay) => {
    return day.exercises.every(exercise => exercise.completed);
  };

  const shareToTwitter = (day: WorkoutDay) => {
    const completedExercises = day.exercises.filter(ex => ex.completed).length;
    const tweetText = `🎮 Level ${day.day} Conquered!\n` +
      `Today's Focus: ${day.focus}\n` +
      `Progress: ${completedExercises}/${day.exercises.length} exercises completed\n` +
      `💪 Join me in the #21DayFitnessChallenge\n` +
      `🏆 Start your journey at ${window.location.origin}\n` +
      `#FitnessGoals #WorkoutChallenge`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
    // Open Twitter share window
    const width = 550;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const options = `width=${width},height=${height},left=${left},top=${top},status=1,scrollbars=1`;
    
    window.open(twitterUrl, 'twitter', options);
    toast.success('Opening Twitter! Share your progress with #21DayFitnessChallenge and inspire others!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            21-Day Fitness Level Up Challenge
          </h1>
          <p className="text-xl sm:text-2xl opacity-90 max-w-2xl">
            Begin your fitness adventure! Each day is a new level to conquer. Unlock achievements, surpass your limits, and join global challengers in this epic journey.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Join The Challenge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Dumbbell className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Quests</h3>
              <p className="text-gray-600 text-center">
                Expertly crafted workout levels that make every day an exciting new challenge
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Calendar className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achievement System</h3>
              <p className="text-gray-600 text-center">
                Complete daily missions, collect badges, and track your fitness journey
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Trophy className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Rankings</h3>
              <p className="text-gray-600 text-center">
                Compete with challengers worldwide and share your fitness victories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Cards Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Your 21-Day Level Up Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingProgram.map((day, dayIndex) => (
              <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">Day {day.day}</h3>
                    <p className="text-sm opacity-90">{day.focus}</p>
                  </div>
                  {isDayCompleted(day) && (
                    <button
                      onClick={() => shareToTwitter(day)}
                      className="bg-blue-400 hover:bg-blue-300 p-2 rounded-full transition-colors duration-200"
                      title="Share on Twitter"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="px-6 py-4">
                  <ul className="space-y-3">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <li key={exerciseIndex} className="flex items-center">
                        <button
                          onClick={() => toggleExercise(dayIndex, exerciseIndex)}
                          className={`p-1 rounded-full mr-2 transition-colors duration-200 ${
                            exercise.completed
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {exercise.completed ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </button>
                        <span className={`text-gray-700 ${exercise.completed ? 'line-through' : ''}`}>
                          {exercise.name}
                        </span>
                        <span className="text-gray-500 text-sm ml-auto">{exercise.sets}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">
            © 2025 Fitness Level Up Challenge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;