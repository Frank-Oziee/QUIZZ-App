import React, { useState, useEffect } from "react";

export default function QuizPage(props) {
  // State variables
  const [userAnswers, setUserAnswers] = useState([]); // Array to store user's selected answers
  const [score, setScore] = useState(0); // User's score
  const [checkClicked, setCheckClicked] = useState(false); // Flag to indicate if the user has clicked "Check Questions" button
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Array to store shuffled questions and answers
  const [timeRemaining, setTimeRemaining] = useState(0); // New state for time remaining

  const { timeInterval, difficulty } = props; // Destructure timeInterval and difficulty from props
  let timerId; // Timer ID for setInterval

  // useEffect hook to shuffle answers when props.quiz changes
  useEffect(() => {
    shuffleAnswers();
  }, [props.quiz]);

  // useEffect hook to start the timer when checkClicked changes
  useEffect(() => {
    if (props.quiz) {
      startTimer();
    }
  }, []);

  // useEffect hook to clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  // Function to shuffle answers for each question
  const shuffleAnswers = () => {
    const shuffled = props.quiz.map((question) => {
      let answers = [];
      if (Array.isArray(question.incorrect_answers)) {
        answers = question.incorrect_answers.flat();
      } else {
        answers.push(question.incorrect_answers);
      }
      answers.push(question.correct_answer);

      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }

      return {
        ...question,
        answers,
      };
    });

    setShuffledAnswers(shuffled);
  };

  // Function to handle click on an answer
  const handleAnswerClick = (questionIndex, answer) => {
    const updatedUserAnswers = [...userAnswers];
    if (updatedUserAnswers[questionIndex] === answer) {
      updatedUserAnswers[questionIndex] = undefined; // If the clicked answer is already selected, unselect it
    } else {
      updatedUserAnswers[questionIndex] = answer; // Otherwise, select the clicked answer
    }
    setUserAnswers(updatedUserAnswers);
  };

  // Function to check the selected answers
  const checkQuestions = () => {
    const answeredQuestions = userAnswers.filter((answer) => answer !== undefined);
    if (answeredQuestions.length !== shuffledAnswers.length) {
      return; // If not all questions are answered, do nothing
    }

    let newScore = 0;
    for (let i = 0; i < shuffledAnswers.length; i++) {
      const selectedAnswer = userAnswers[i];
      const correctAnswer = shuffledAnswers[i].correct_answer;
      if (selectedAnswer === correctAnswer) {
        newScore++; // Increment score for each correct answer
      }
    }
    setScore(newScore);
    setCheckClicked(true); // Set checkClicked flag to true
  };

  // Function to generate a new quiz
  const generateNewQuiz = () => {
    setUserAnswers([]);
    setScore(0);
    setCheckClicked(false);
    clearTimeout(timerId);
    shuffleAnswers();
  };

  // Function to start the timer
  const startTimer = () => {
    if (timeInterval > 0) {
      const difficultyMultiplier = getDifficultyMultiplier(difficulty); // Get the difficulty multiplier based on the selected difficulty
      const endTime = Date.now() + timeInterval * 60 * 1000 * difficultyMultiplier; // Calculate the end time based on the time interval and difficulty multiplier
      timerId = setInterval(() => {
        const remaining = Math.round((endTime - Date.now()) / 1000); // Calculate the remaining time in seconds
        setTimeRemaining(remaining);
        if (remaining <= 0) {
          clearInterval(timerId);
          handleTimeUp();
        }
      }, 1000);
    }
  };

  // Function to handle time up
  const handleTimeUp = () => {
    window.location.reload(); // Refresh the page
  };

  // Function to get the difficulty multiplier
  const getDifficultyMultiplier = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 1.5;
      case "hard":
        return 2;
      default:
        return 1;
    }
  };

  // Render the quiz component
  return (
    <div className="quizAppMain">
      <div className="headNtime"> <h1 className="quizAppMainH1">ANSWER THE FOLLOWING QUIZ QUESTIONS:</h1> <span><p className="quizAppMainTimeP">
        Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? '0' : ''}
        {timeRemaining % 60}
      </p></span></div>
       <p className="hParagraph">Test your IQ, by taking note of the number of 'Generated Questions' you can answer correctly within the selected DIFFICULTY,
        and your Score for each 'Generated Question'!
        </p>   <br></br> 
      {shuffledAnswers.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <p className="answers">
            {question.answers.map((answer, idx) => (
              <span
                key={idx}
                className={
                  userAnswers[index] === answer
                    ? checkClicked && answer === question.correct_answer
                      ? "correctAnswer"
                      : "selectedAnswer"
                    : "answer"
                }
                onClick={() => handleAnswerClick(index, answer)}
              >
                {answer}
              </span>
            ))}
          </p>
          <hr />
        </div>
      ))}
      {checkClicked ? (
        <div>
          <p className="scorePara">
            Your score: {score}/{shuffledAnswers.length}
          </p>
          <button className="genNcheckQuizButn" onClick={generateNewQuiz}>Generate New Quiz</button>
        </div>
      ) : (
        <button className="genNcheckQuizButn" onClick={checkQuestions}>Check Questions</button>
      )}
      
    </div>
  );
}

