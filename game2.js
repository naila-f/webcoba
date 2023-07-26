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
        question: "Berikut ini perintah untuk mengganti baris pada HTML adalah ...",
        choice1: "br",
        choice2: "b",
        choice3: "img",
        choice4: "i",
        choice5: "small",
        answer:  1,
    },
    {
        question:"Berikut ini yang bukan termasuk tag untuk membuat heading adalah ...",
        choice1: "<h1>",
        choice2: "<h3>",
        choice3: "<h7>",
        choice4: "<h6>",
        choice5: "<h1>",
        answer: 3,
    },
    {
        question: "Tag heading terbesar dalam tag HTML adalah ...",
        choice1: "<h5>heading</h5>",
        choice2: "<h2>heading</h2>",
        choice3: "<h3>heading</h3>",
        choice4: "<h1>heading</h1>",
        choice5: "<h6>heading</h6>",
        answer: 4,
    },
    {
        question: "Perhatikan kode html berikut : <i>Semua</i> hasil dari kode html di atas adalah ...",
        choice1: "Kata Semua dicetak tebal",
        choice2: "Kata Semua dicetak berwarna",
        choice3: "Kata Semua diberi garis bawah",
        choice4: "Kata Semua diberi tanda",
        choice5: "Kata Semua dicetak miring",
        answer: 5,
    },
    {
        question: "Kegunaan dari tag <mark> …. </mark> pada html untuk ...",
        choice1: "Untuk menandai teks",
        choice2: "Untuk menebalkan teks",
        choice3: "Untuk membuat garis bawah pada teks",
        choice4: "Untuk mewarnai teks",
        choice5: "Untuk membuat teks berukuran kecil",
        answer: 1,
    },
    {
        question: "Kegunaan dari tag <u> …. </u> pada html untuk ...",
        choice1: "Untuk menandai teks",
        choice2: "Untuk menebalkan teks",
        choice3: "Untuk membuat garis bawah pada teks",
        choice4: "Untuk mewarnai teks",
        choice5: "Untuk membuat teks berukuran kecil",
        answer: 3,
    },
    {
        question: "Tag <abbr> merupakan tag yang digunakan untuk ...",
        choice1: "Mendefinisikan alamat atau kontak informasi",
        choice2: "Mendefinisikan sebuah kutipan pendek",
        choice3: "Mendefinisikan judul karya",
        choice4: "Mendefinisikan sebuah istilah definisi",
        choice5: "Mendefinisikan sebuah singkatan",
        answer: 5,
    },
    {
        question: "Huruf atau angka kecil yang berada di atas dan berdampingan dengan teks dikenal dengan ...",
        choice1: "Subelemen",
        choice2: "Superscript",
        choice3: "Elemen",
        choice4: "Subscript",
        choice5: "Subcode",
        answer: 4,
    },
    {
        question: "Untuk membuat tulisan menjadi kecil dapat menggunakan tag ...",
        choice1: "<small>",
        choice2: "<size>",
        choice3: "<u>",
        choice4: "<sup>",
        choice5: "<sub>",
        answer: 1,
    },
    {
        question: "Untuk menampilkan karakter khusus copyright © dengan menggunakan tag ...",
        choice1: "&reg;",
        choice2: "&copy;",
        choice3: "&nbsp;",
        choice4: "&lt;",
        choice5: "&gt;",
        answer: 2,
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