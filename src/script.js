import { showSorterGame } from "./sorter.js";
import { ripple } from "./button.js";

const CONTAINER = document.querySelector('.container');

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
CONTAINER.append(wrapper);

const h1 = document.createElement('h1');
h1.classList.add('heading');
h1.textContent = 'Segregation Game';
const pRules = document.createElement('p');
pRules.classList.add('rules');
pRules.textContent = 'lorem ipsum dolor sit, amet consectetur adipisicing elit Rem nobis dolor excepturi fuga tempore ipsa quia corporis possimus repellendus explicabo nulla fugiat nemo cum modi nam atque consequuntur, blanditiis vero';
const btnStart = document.createElement('button');
btnStart.classList.add('btn');
btnStart.classList.add('start-game');
btnStart.innerHTML = 'Start The Game!';

wrapper.append(h1);
wrapper.append(pRules);
wrapper.append(btnStart);

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    ripple(btn);

    btn.addEventListener('click', () => {
        setTimeout(showSorterGame, 200);
    })
});

