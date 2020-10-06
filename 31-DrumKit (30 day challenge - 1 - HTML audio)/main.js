const keys = document.querySelectorAll('.key');
const audio = document.getElementById('aa');

keys.forEach(key => {
    key.addEventListener('mouseover', () => {
        key.classList.add('highlight');
    })
    key.addEventListener('mouseout', () => {
        key.classList.remove('highlight');
    })
    key.addEventListener('click', () => {
        const x = key.id;
        playAudio(x);
    })
})

document.addEventListener('keypress', (e) => {
    const key = e.key.toLowerCase();
    const keyPress = document.getElementById(key);
    keyPress.classList.add('highlight');
    playAudio(key);
    setTimeout(() => {
        keyPress.classList.remove('highlight');
    }, 200);
})

function playAudio(key) {
    const audio = document.getElementById(`a${key}`);
    audio.load();
    audio.play();
}
