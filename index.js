let questionNumber = 0;
let score = 0;


function generateQuestion() {
    /* compares questionNumber to Array Length of STORE*/
    if (questionNumber < STORE.length) {
        /* question number is also declared as a class*/
        return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].choices[0]
    }" name="answer" required>
   <span>${STORE[questionNumber].choices[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].choices[1]
    }" name="answer" required>
    <span>${STORE[questionNumber].choices[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].choices[2]
    }" name="answer" required>
    <span>${STORE[questionNumber].choices[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].choices[3]
    }" name="answer" required>
    <span>${STORE[questionNumber].choices[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
    } else {
        renderResults();
        restartQuiz();
        $(".questionNumber").text(10);
    }
}


function incrementScore() {
    score++;
    $(".score").html(`Score: ${score}/${STORE.length}`)
}

function incrementQuestionNumber() {
    questionNumber++;

    $('.questionNumber').text(questionNumber + 1);
    $(".questionCount").html(`Question: ${questionNumber + 1}/${STORE.length}`);

}

/*note will set the HTML to generateQuestion which we created above*/
function renderQuestion() {
    $('.questAnsForm').html(generateQuestion());
}

/* Remember Store.length should be about 10*/
function currentQuestion() {
    $(".questionCount").html(`Question: ${questionNumber + 1}/${STORE.length}`);

}




/* will start at 0/10 since we set score = 0 and the array length is 10*/
function currentScore() {
    $(".score").html(`Score: ${score}/${STORE.length}`)

}



function handleStartQuiz() {
    $(".quizStart").on("click", ".startButton", function (event) {
        $(".quizStart").remove();
        $(".questAnsForm").css("display", "block");
        $(".questionNumber").text(1);
        $(".hidden").css("display", "inline-block");
        $("#checkingSection").css("display", "none")
    });
}


/*if choiceSelection and acceptedAnswer are set to equal eachother then you can determine the correct answer*/
function handleSubmittedChoice() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let acceptedAnswer = `${STORE[questionNumber].answer}`;
        let choiceSelection = $('input:checked').val();
        if (acceptedAnswer === choiceSelection) {
            correctMessage();
            incrementScore();
        } else {
            incorrectMessage();
        }
    });
}

/*will get you to the next question through checkingSection*/
function handleNextButton() {
    $('#checkingSection').on('click', '#js-next-button', function (event) {
        if (questionNumber === 10) {
            renderResults();
        } else {
            $('.questAnsForm').show();
            $('#checkingSection').hide();
            incrementQuestionNumber();
            renderQuestion();
        }

    })

}


/*Don't invoke this at the bottom or you'll see it the entire time*/
function correctMessage() {
    $('#checkingSection').show();
    $('.questAnsForm').hide();
    $('#resultMesg').html(`${STORE[questionNumber].answer}` + ' is correct!');
}


function incorrectMessage() {
    $('#checkingSection').show();
    $('#quizAnsForm').hide();
    $('#resultMesg').html('Wrong the correct answer is ' + `${STORE[questionNumber].answer}`);
}







function quizApp() {
    handleStartQuiz();
    renderQuestion();
    currentQuestion();
    currentScore();
    handleSubmittedChoice();
    handleNextButton();
}
$(quizApp);