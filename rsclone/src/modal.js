/* eslint-disable func-names */
export const modalHelpContainer = document.querySelector('.help_container');
export const modalSetupContainer = document.querySelector('.setup_container');
export const helpOpenBttn = document.querySelector('.help_bttn');
export const setupOpenBttn = document.querySelector('.setup_button');
export const helpCloseBttn = document.querySelector('.help_container_close_bttn');
export const setupCloseBttn = document.querySelector('.setup_container_close_bttn');

helpOpenBttn.onclick = function () {
  modalHelpContainer.style.display = 'block';
  document.querySelector('.video').play();
};

helpCloseBttn.onclick = function () {
  modalHelpContainer.style.display = 'none';
  document.querySelector('.video').pause();
};

setupOpenBttn.onclick = function () {
  modalSetupContainer.style.display = 'block';
};

setupCloseBttn.onclick = function () {
  modalSetupContainer.style.display = 'none';
};

window.onclick = function (e) {
  if (e.target === modalHelpContainer) {
    modalHelpContainer.style.display = 'none';
    document.querySelector('.video').pause();
  }
  if (e.target === modalSetupContainer) {
    modalSetupContainer.style.display = 'none';
  }
};
