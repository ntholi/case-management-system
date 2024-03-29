export function calculateAge(
  dateOfBirth: Date | string | null | undefined
): string {
  if (!dateOfBirth) {
    return 'age unknown';
  }

  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);

  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (age === 1) return `${age} year old`;
  return `${age} years old`;
}
