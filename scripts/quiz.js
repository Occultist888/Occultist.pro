let randomQuestions;
let v = 0;
let numberOfQuestions = 10; // Количество вопросов можно менять
let rightAnswers = 0;

function loadJSON(callback) {
    fetch('../data/quiz64.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON file:', error));
}

function selectRandomQuestions(questions) {
    let selectedQuestions = [];
    let totalQuestions = questions.length;
    let indexes = Array.from(Array(totalQuestions).keys());

    for (let j = 0; j < numberOfQuestions; j++) {
        let randomIndex = Math.floor(Math.random() * indexes.length);
        let selectedIndex = indexes[randomIndex];
        selectedQuestions.push(questions[selectedIndex]);
        indexes.splice(randomIndex, 1);
    }

    return selectedQuestions;
}

function base64DecodeUnicode(str) {
    const bytes = atob(str).split('').map(char => char.charCodeAt(0));
    const utf8Decoder = new TextDecoder('utf-8');
    return utf8Decoder.decode(new Uint8Array(bytes));
}

function quizHTML() {
    let questionNumber = document.getElementById("question-number");
    let bodyOfQuestion = document.getElementById("body-of-question");
    bodyOfQuestion.style.marginBottom = "20px";

    questionNumber.innerHTML = "Вопрос " + (v + 1) + " из " + numberOfQuestions;
    bodyOfQuestion.innerHTML = randomQuestions[v].question;

    for (let i = 0; i < 3; i++) {
        let button = document.getElementById('question-option' + (i + 1));
        button.innerHTML = randomQuestions[v].options[i];
        button.style.backgroundColor = "white";
        button.style.borderColor = "rgb(79, 0, 147)";
        button.removeAttribute('disabled', '');

        button.onclick = function() {                       
            let correctAnswer = base64DecodeUnicode(randomQuestions[v].correct_answer);
            for (let j = 0; j < 3; j++) {
                let currentButton = document.getElementById('question-option' + (j + 1)); 
                currentButton.setAttribute('disabled', '');                
                if (currentButton.innerHTML == correctAnswer) {                    
                    currentButton.style.borderColor = "green";
                    currentButton.style.backgroundColor = "#E2FFE7";
                    currentButton.classList.add("right");
                } else {
                    currentButton.style.borderColor = "#FF5B6B";
                    currentButton.style.backgroundColor = "#FFEEEF";
                }
            }
            document.getElementById("quiz-btn").style.opacity = 1;
            document.getElementById("quiz-btn").removeAttribute('disabled', '');

            // Check if the current button is correct
            if (button.classList.contains('right')) {
                rightAnswers++;
                 // Update the number of correct answers
                document.getElementById('right-answers').style.display = "block";
                document.getElementById('right-answers').innerHTML = "(Правильных ответов: " + rightAnswers + ")";
                document.getElementById("quiz").scrollIntoView({ behavior: 'smooth' });

            } else {
                //Just scroll page to the quiz top, if answer is incorrect
                document.getElementById("quiz").scrollIntoView({ behavior: 'smooth' });
            }

           
            if (v < numberOfQuestions - 1) {
                v++;
            } else {
                v = 0;
                rightAnswers = 0;                
            }

            // Remove the right class from all buttons
            for (let j = 0; j < 3; j++) {
                document.getElementById('question-option' + (j + 1)).classList.remove("right");
            }
        };
    }
}

function quizLogic() {
    let btn = document.getElementById("quiz-btn");
    btn.innerHTML = v < numberOfQuestions - 1 ? "Следующий вопрос" : "Попробовать еще раз";    
    btn.style.opacity = 0.6;
    btn.setAttribute('disabled', '');

    if (v == 0) {
        document.getElementById('right-answers').style.display = "none";
        loadJSON(function(data) {
            randomQuestions = selectRandomQuestions(data.questions);
            quizHTML();
        });
        document.getElementById("question-options").style.display = "flex";
        document.getElementById("question-number").style.fontSize = "30px";
    } else {
        quizHTML();
    }

    document.getElementById("quiz").scrollIntoView({ behavior: 'smooth' });
}

function quizStarter() {
    quizLogic();
}
