import log from './log';

const copy = (event) => {
  const text = event.target.dataset.value;
  navigator.clipboard.writeText(text);
  log(`Copied [text:${text}]`);
};

export default copy;
