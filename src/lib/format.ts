export function date(date: Date | undefined | null) {
  if (!date) return '';
  const formatter = new Intl.DateTimeFormat('en-LS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  try {
    return formatter.format(date);
  } catch (e) {
    console.error('Error formatting date', date);
    return 'Invalid Date';
  }
}
export function dateTime(date: Date | undefined | null) {
  if (!date) return '';
  const formatter = new Intl.DateTimeFormat('en-LS', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  try {
    return formatter.format(date);
  } catch (e) {
    console.error('Error formatting date', date);
    return 'Invalid Date';
  }
}
