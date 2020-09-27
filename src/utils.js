export const debounce = (fn, delay = 500) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const mostVal = (items, prop) => {
  const map = {};
  for (let item of items) {
    if (item[prop] in map) {
      map[item[prop]] += 1;
    } else {
      map[item[prop]] = 1;
    }
  }
  const keys = Object.keys(map);
  let max = 0,
    maxEle = map[keys[0]];
  for (let i = 0; i < keys.length; i++) {
    if (map[keys[i]] > max) {
      max = map[keys[i]];
      maxEle = keys[i];
    }
  }
  return maxEle && maxEle.trim() !== '' ? maxEle : '暂无数据';
};
