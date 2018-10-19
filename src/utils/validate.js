export const required = value => (value ? undefined : 'Required');

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const phoneNumber = value =>
  value && !/^\+?[78]|[(38)][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;
