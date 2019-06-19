/* eslint-env browser */
import './assets/scss/style.scss';
import 'reset-css';

// config
const speed = 5;
const debug_mode = false;

let dvd_logo = document.getElementsByClassName('dvd_logo')[0];

let container_height = document.body.clientHeight;
let container_width = document.body.clientWidth;
let pos_x = 300;
let pos_y = 500;
let logo_height = 100;
let logo_width = 196;

let calc_sub = x => x - 1;
let calc_plus = x => x + 1;
let pos_x_calc = calc_plus;
let pos_y_calc = calc_plus;

let logo_colors = ['white', 'green', 'blue', 'red', 'orange'];
let logo_color_id = 0;

function update_debug_info(wh, ww, logo_height, logo_width, pos_x, pos_y) {

  let debug_div = document.getElementsByClassName('debug_info')[0];
  if (debug_mode) {
    debug_div.style.display = 'block';
  } else {
    debug_div.style.display = 'none';
  }
  debug_div.innerText = Array.from(arguments).join(', ');
}

function change_color() {
  // change color to next 
  logo_color_id++;
  if (logo_color_id >= logo_colors.length) {
    logo_color_id=0;
  }
  dvd_logo.style.backgroundColor = logo_colors[logo_color_id];
  
}

function collision_checking() {
  // hitting bottom
  if (pos_y + logo_height >= container_height) {
    pos_y_calc = calc_sub;
    change_color();
  }
  
  // hitting right
  if (pos_x + logo_width >= container_width) {
    pos_x_calc = calc_sub;
    pos_y_calc = calc_sub;
    change_color();
  }
  
  // hitting top
  if (pos_y <= 0) {
    pos_y_calc = calc_plus;
    change_color();
  }
  
  // hitting left
  if (pos_x <= 0) {
    pos_x_calc = calc_plus;
    change_color();
  }
}

// main loop
let mainloop = setInterval(function() {
  // refresh container height and width
  container_height = document.body.clientHeight;
  container_width = document.body.clientWidth;

  // caculate and move box
  pos_x = pos_x_calc(pos_x);
  pos_y = pos_y_calc(pos_y);
  dvd_logo.style.left = pos_x + 'px';
  dvd_logo.style.top = pos_y + 'px';

  update_debug_info(container_height, container_width, logo_height, logo_width, pos_x, pos_y);

  collision_checking();
}, speed);

console.log('homepage: https://github.com/dev-techmoe/nodisc-dvd-simulator');