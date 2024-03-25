export function calculateAge(
  dateOfBirth: Date | string | null | undefined
): number {
  if (!dateOfBirth) {
    return 0;
  }

  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
