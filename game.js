const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Apa singkatan dari CSS...",
        choice1: "Cascading Style Sheets",
        choice2: "Cascading Sheet Style",
        choice3: "Cascading Short Style",
        choice4: "Cascading Style Shets",
        choice5: "Cascading Style Short",
        answer:  1,
    },
    {
        question:
            "Berikut ini yang termasuk manfaat penggunaan CSS dalam pembuatan web adalah...",
        choice1: "Kode HMTL menjadi lebih rumit dan lebih susah diatur",
        choice2: "Ukuran file menjadi lebih kecil sehingga mempercepat load file lebih cepat",
        choice3: "Tidak dapat berkolaborasi dengan JavaScript",
        choice4: "Hanya dapat digunakan di beberapa jenis browser",
        choice5: "Menyulitkan untuk mengelola kode/script",
        answer: 2,
    },
    {
        question: "Bagian css yang merupakan nilai dari property CSS adalah ...",
        choice1: "Selector",
        choice2: "Value",
        choice3: "Property",
        choice4: "Script",
        choice5: "ID",
        answer: 2,
    },
    {
        question: "Sintaks CSS yang benar di bawah ini adalah ...",
        choice1: "body [ color: blue] ;",
        choice2: "h1 { color: blue};",
        choice3: "color {h1 : blue;}",
        choice4: "body {color : blue};",
        choice5: "h1 {color : blue;}",
        answer: 5,
    },
    {
        question: "Perhatikan script CSS ini : h1 {color: red;} yang disebut properti adalah ...",
        choice1: "h1",
        choice2: "red",
        choice3: "{}",
        choice4: "color",
        choice5: ";",
        answer: 4,
    },
    {
        question: "Perhatikan script CSS ini : h1 {color: red;} yang disebut selector adalah ...",
        choice1: "h1",
        choice2: "red",
        choice3: "{}",
        choice4: "color",
        choice5: ";",
        answer: 1,
    },
    {
        question: "Salah satu jenis selektor CSS adalah id. Untuk mendeklarasikan sebuah selektor id tanda yang digunakan didepan nama id adalah ...",
        choice1: ": (tanda titik dua)",
        choice2: "; (tanda titik koma)",
        choice3: "# (tanda kresh)",
        choice4: ". (tanda titik)",
        choice5: "! (tanda seru)",
        answer: 3,
    },
    {
        question: "Penulisan selektor yang benar jika class diberi nama class gambar adalah ...",
        choice1: "#gambar",
        choice2: "gambar;",
        choice3: ".gambar",
        choice4: "!gambar",
        choice5: "gambar.",
        answer: 3,
    },
    {
        question: "Tag HTML yang digunakan untuk menambahkan style sheet internal adalah ...",
        choice1: "<head>",
        choice2: "<html>",
        choice3: "<body>",
        choice4: "<p>",
        choice5: "<style>",
        answer: 5,
    },
    {
        question: "Penulisan css dengan embedded style sheet yaitu dengan menambahkan atribute ...",
        choice1: "<style type =  “text/media”>",
        choice2: "<style type =  “media/css”>",
        choice3: "<style type =  “text/sheet”>",
        choice4: "<style type =  “text/css”>",
        choice5: "<style type =  “teks/css”>",
        answer: 4,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()