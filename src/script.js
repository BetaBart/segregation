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
pRules.innerHTML = 'Please use the <b>LEFT</b> and <b>RIGHT</b> to move across the board. <br> Pressing <b>DOWN</b> will speed up the trash.';
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

