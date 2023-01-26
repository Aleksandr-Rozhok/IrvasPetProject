import "./slider";
import modal from "./modules/modal";
import forms from "./modules/form";
import timer from "./modules/timer";
import tabs from "./modules/tabs";
import calc from "./modules/calc";
import photo from "./modules/photo";

window.addEventListener("DOMContentLoaded", () => {
    modal(".popup_engineer", ".popup_engineer_btn", ".popup_close", ".popup_engineer");
    modal(".popup", ".phone_link", ".popup_close");
    modal(".popup_calc", ".popup_calc_btn", ".popup_calc_close");
    forms("form");
    timer("#timer", "2024-01-01");
    tabs(".glazing_block", ".glazing_content", ".glazing_slider", "tab-active", "div.glazing_block img", "div.glazing_block a", "div.glazing_block");
    tabs(".decoration_item", ".decoration-content", ".decoration_slider", "after_click", "div.decoration_item", "div.decoration_item a");
    calc();
    photo();
})