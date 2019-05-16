export const required = value => (value ? undefined : 'Это поле является обязательным');

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный email адрес'
    : undefined;

export const phoneNumber = value =>
  value && !/^\+?[78]|[(38)][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i.test(value)
    ? 'Неверный номер телефона'
    : undefined;

export const year = value => value && !/^\d{4}/i.test(value)
  ? 'Неверный формат года'
  : undefined;

export const url = value =>
  value && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(value)
    ? 'Неверный формат URL'
    : undefined;
