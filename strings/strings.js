document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const resultsModal = document.getElementById('resultsModal');
    const closeButton = document.querySelector('.close-button');

    let quizQuestions = [];

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            quizQuestions = data;
            buildQuiz();
        })
        .catch(error => console.error('Error loading the questions:', error));

    function buildQuiz() {
        const output = [];
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (let letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selectedOption = answerContainer.querySelector('input[name=question' + questionNumber + ']:checked');
            const userAnswer = (selectedOption || {}).value;

            answerContainer.querySelectorAll('label').forEach(label => {
                if (label.querySelector('input').value === currentQuestion.correctAnswer) {
                    label.classList.add('correct');
                } else if (label.querySelector('input').value === userAnswer) {
                    label.classList.add('incorrect');
                }
            });

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
            }
        });

        resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizQuestions.length} correct.`;
        resultsModal.style.display = 'block';
    }

    submitButton.addEventListener('click', showResults);

    closeButton.addEventListener('click', function() {
        resultsModal.style.display = 'none';
        resetQuiz();
    });

    window.addEventListener('click', function(event) {
        if (event.target === resultsModal) {
            resultsModal.style.display = 'none';
            resetQuiz();
        }
    });

    function resetQuiz() {
        // Clear the quiz container and results
        quizContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        // Rebuild the quiz
        buildQuiz();
    }
});
