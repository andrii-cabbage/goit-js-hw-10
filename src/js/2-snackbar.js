import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  delay: document.querySelector(`input[name="delay"]`),
  fulfilled: document.querySelector(`input[value="fulfilled"]`),
  rejected: document.querySelector(`input[value="rejected"]`),
  sbmtBtn: document.querySelector(`button[type="submit"]`),
};

const showToast = message => iziToast.show({ message });

elements.sbmtBtn.addEventListener(`click`, event => {
  event.preventDefault();

  const delay = Number(elements.delay.value);
  const fulfilledChecked = elements.fulfilled.checked;
  const rejectedChecked = elements.rejected.checked;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledChecked) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (rejectedChecked) {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })

    .then(showToast)
    .catch(showToast);
});