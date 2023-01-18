import './slider';
import modal from './modules/modal';
import forms from './modules/form';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    modal();
    forms("form")
    timer('#timer', '2024-01-01');
})