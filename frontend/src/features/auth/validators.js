export function validateEmail(email) {
  if (!email) return 'Email required';
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? null : 'Invalid email';
}

export function validatePassword(pw) {
  if (!pw) return 'Password required';
  if (pw.length < 6) return 'Password too short';
  return null;
}
