const quizData = [
    {
      question: "Which of the following is a client-side language?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d",
    },
    {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Cascading Style Sheet",
      c: "Jason Object Notation",
      d: "Helicopters Terminals Motorboats Lamborghinis",
      correct: "a",
    },
    {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "None of the above",
      correct: "b",
    },
    {
      question: "What does CSS stand for?",
      a: "Hypertext Markup Language",
      b: "Cascading Style Sheet",
      c: "Jason Object Notation",
      d: "Helicopters Terminals Motorboats Lamborghinis",
      correct: "b",
    },
  ];
  
  let index = 0;
  let correct = 0,
    incorrect = 0,
    total = quizData.length;
  let startTime;
  let questionTimerInterval;

  const container = document.getElementById("container");
  const questionBox = document.getElementById("questionBox");
  const allInputs = document.querySelectorAll("input[type='radio']");
  const submitBtn = document.querySelector("#submit");

  // Registration step
  const loadRegistration = () => {
    container.innerHTML = `
      <div class="registration">
        <h3>Please Register to Start the Quiz</h3>
        <input type="text" id="username" placeholder="Enter your name" />
        <button id="startQuiz">Start Quiz</button>
      </div>
    `;
  
    document.getElementById("startQuiz").addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      if (username) {
        startTime = new Date(); // Start the timer
        loadQuestion();
      } else {
        alert("Please enter your name to continue.");
      }
    });
  };

  // Timer per question
  const startQuestionTimer = () => {
    let timeLeft = 30; // 30 seconds per question
    const timerElement = document.getElementById("question-timer");
    timerElement.innerText = `Time Left: ${timeLeft}s`;

    questionTimerInterval = setInterval(() => {
      timeLeft--;
      timerElement.innerText = `Time Left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(questionTimerInterval);
        nextQuestion();
      }
    }, 1000);
  };

  // Load question step
  const loadQuestion = () => {
    if (total === index) {
      return quizEnd();
    }

    reset();

    const data = quizData[index];
    container.innerHTML = `
      <div id="quiz">
        <h4 id="questionBox">${index + 1}) ${data.question}</h4>
        <div>
          <input type="radio" name="answer" value="a" id="a" />
          <label for="a">${data.a}</label>
        </div>
        <div>
          <input type="radio" name="answer" value="b" id="b" />
          <label for="b">${data.b}</label>
        </div>
        <div>
          <input type="radio" name="answer" value="c" id="c" />
          <label for="c">${data.c}</label>
        </div>
        <div>
          <input type="radio" name="answer" value="d" id="d" />
          <label for="d">${data.d}</label>
        </div>
        <div id="question-timer"></div>
        <button id="nextBtn">Next</button>
        <button id="submitBtn">Submit</button>
      </div>
    `;

    document.getElementById("nextBtn").addEventListener("click", () => {
      clearInterval(questionTimerInterval);
      nextQuestion();
    });
    document.getElementById("submitBtn").addEventListener("click", () => {
      clearInterval(questionTimerInterval);
      quizEnd();
    });

    startQuestionTimer();
  };

  // Next question logic
  const nextQuestion = () => {
    const data = quizData[index];
    const ans = getAnswer();
    if (ans === data.correct) {
      correct++;
    } else {
      incorrect++;
    }
    index++;
    loadQuestion();
  };

  // Get selected answer
  const getAnswer = () => {
    let ans;
    const inputs = document.querySelectorAll("input[name='answer']");
    inputs.forEach((input) => {
      if (input.checked) {
        ans = input.value;
      }
    });
    return ans;
  };

  // Reset radio buttons
  const reset = () => {
    const inputs = document.querySelectorAll("input[name='answer']");
    inputs.forEach((input) => {
      input.checked = false;
    });
  };

  // End quiz logic
  const quizEnd = () => {
    clearInterval(questionTimerInterval);
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000); // Calculate duration in seconds
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    container.innerHTML = `
      <div class="col">
        <h3>Hi, you've scored ${correct} / ${total}!</h3>
        <p>Your total time: ${minutes} minutes and ${seconds} seconds</p>
      </div>
    `;
  };

  // Start the quiz by loading the registration
  loadRegistration();
