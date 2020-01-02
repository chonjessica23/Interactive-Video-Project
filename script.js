/**
 * Created by billyzou on 2017/11/18.
 */
let clientHeight = document.documentElement.clientHeight;
let clientWidth = document.documentElement.clientWidth;
const vid = document.getElementById('vid');
const hint = document.getElementById('hint');
const choice = document.getElementById('choice');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const tryAgain = document.getElementById('tryAgain');
const start = document.getElementById('start');
const playAgain = document.getElementById('playAgain');
let initial = true;
let currentChoice = -1;
let state = 0;
let TEST = false;
let CONTROLS = false;

// Below is the function executed when the webpage is loaded.
window.onload = () => {
    vid.addEventListener('ended', displayChoice);
    nextOne();
};

function nextOne () {
    if (CONTROLS) {
        vid.controls = 'controls';
    }
    if (initial === true) {
        vid.style.maxHeight = clientHeight * 0.8 + 'px';
        vid.style.maxWidth = clientWidth * 0.8 + 'px';
        initial = false;
    } else {
        hint.style.display = 'none';
        choice.style.display = 'none';
        tryAgain.style.display = 'none';
        vid.style.maxHeight = clientHeight * 0.95 + 'px';
        vid.style.maxWidth = clientWidth * 0.95 + 'px';
    }
    if (TEST) {displayChoice();}
    switch(state) {
        case 0:
            setChoice({
                'h': ''
            });
            break;
        case 1:
            vid.play();
            start.style.left = '30%';
            start.innerText = "Help Jessica!";
            vid.autoplay = "autoplay";
            break;
        case 2:
            choice.removeChild(start);
            vid.src = "video/1.mp4";
            vid.load();
            setChoice({
                'h': "Should Jessica talk to Billy?",
                'one': 'Talk to Billy!', // Go to 3
                'two': 'Just stay here' // Go to 4
            });
            break;
        case 3:
            vid.src = "video/1.1.mp4";
            vid.load();
            state += 2;
            setChoice({
                'h': "Hooray! Jessica got Billy's Wechat!",
                'one': 'Leave with satisfaction!'
            });
            break;
        case 4:
            vid.src = "video/1.2.mp4";
            setChoice({
                'h': "What should Jessica do?",
                'one': 'CONFRONT THAT GIRL',
                'two': 'It should be okay... just message him tomorrow'
            });
            break;
        case 5:
            vid.src = "video/1.2.1.mp4";
            setChoice({
                'h': "OMG that girl was just Billy's cousin, so awkward...",
                "try": ''
            });
            break;
        case 6:
            setChoice({
               'h':  'What should Jessica do?',
               'one': 'Invite Billy to grab some coffee',
               'two': 'Invite Billy to have dinner together',
               'three': 'Ask Billy where he is',
            });
            vid.src = "video/try_message_billy.mp4";
            break;
        case 7:
            setChoice({
                'h': 'Billy is allergic to coffee...',
                'try': ''
            });
            vid.src = "video/grab_coffee.mp4";
            break;
        case 8:
            setChoice({
                'h': "Billy is busy and doesn't have time to have dinner with Jessica...",
                "try": ''
            });
            vid.src = "video/message_dinner.mp4";
            break;
        case 9:
            setChoice({
                'h': "Billy is sick. How can Jessica help Billy?",
                'one': "Get some medicine for him",
                'two': "Take notes of POH class for him"
            });
            vid.src = "video/where_are_you.mp4";
            break;
        case 10:
            state += 5;
            setChoice({
                'h': "The medicine is for diarrhea...",
                'one': "Wait... is that Billy I hear? Who is he talking with?"
            });
            vid.src = "video/3.1.mp4";
            break;
        case 11:
            setChoice({
                'h': "Billy is grateful and asks Jessica to dinner with him. Should Jessica go?",
                'one': "OF COURSE! This is what she's been waiting for!!!",
                'two': "RUN AWAY! She's not ready for this!"
            });
            vid.src = "video/3.2.mp4";
            break;
        case 12:
            setChoice({
                'h': "It's 5pm now!",
                'three': "Go get 'em gurlll ;)"
            });
            vid.src = "video/3.2.1.mp4";
            break;
        case 13:
            setChoice({
                'h': "Why did Jessica run away? She missed the opportunity...",
                'three': "Wait... is that Billy I hear? Who is he talking with?"
            });
            vid.src = "video/3.2.2.mp4";
            break;
        case 15:
            hint.style.fontSize = '36px';
            setChoice({
               'h': "Congratulations! Jessica finally won Billy's heart!",
            });
            vid.src = "video/good.mp4";
            break;
        case 16:
            hint.style.fontSize = '36px';
            setChoice({
                'h': "You've completely failed. Nice try!"
            });
            vid.src = "video/bad.mp4";
    }
}

// function setVideoSrc (src) {
//     vid.src = "video/" + src + ".mp4";
// }

function displayChoice () {
    vid.style.maxHeight = clientHeight * 0.8 + 'px';
    vid.style.maxWidth = clientWidth * 0.8 + 'px';
    hint.style.left = (clientWidth - parseFloat(window.getComputedStyle(vid).width)) / 1.6 + 'px';
    choice.style.left = (clientWidth - parseFloat(window.getComputedStyle(vid).width)) / 2 + 'px';
    hint.style.display = 'block';
    choice.style.display = 'inline';
    if (state === 15 || state === 16) {
        playAgain.style.display = 'inline-block';
    }
}

function choose (n) {
    if (n !== 0) {
        currentChoice = n;
        state += n;
        nextOne();
    } else {
        state -= currentChoice;
        currentChoice = -1;
        nextOne();
    }
}

function setChoice (obj) {
    hint.innerText = obj['h'];

    if (obj['one'] === undefined) {
        choice1.style.display = 'none';
    } else {
        choice1.innerText = obj['one'];
        choice1.style.display = 'inline-block';
    }

    if (obj['two'] === undefined) {
        choice2.style.display = 'none';
    } else {
        choice2.innerText = obj['two'];
        choice2.style.display = 'inline-block';
    }

    if (obj['three'] === undefined) {
        choice3.style.display = 'none';
    } else {
        choice3.innerText = obj['three'];
        choice3.style.display = 'inline-block';
    }

    if (obj['try'] === undefined) {
        tryAgain.style.display = 'none';
    } else {
        tryAgain.innerText = 'Try Again';
        tryAgain.style.display = 'inline-block';
    }
}

function again() {
    location.reload();
}


