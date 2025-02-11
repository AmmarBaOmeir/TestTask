export const getNavs = () => {
  return fetch('http://localhost:8081/nav')
    .then((response) => response.json())
    .then((data) => data);
};

export const postNavs = (newItems) => {
  return fetch('http://localhost:8081/nav', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItems),
  }).then((response) => console.log(response.status));
};

export const trackNavs = (data) => {
  return fetch('http://localhost:8081/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((response) => console.log(response.status));
};
