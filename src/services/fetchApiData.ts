const url = 'https://economia.awesomeapi.com.br/json/all';

export const fetchApiData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
