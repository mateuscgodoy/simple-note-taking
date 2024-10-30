export default function validateStringLength(
  value: string,
  maxLength: number = 100
): boolean {
  value = value.trim();
  return value.length > 0 && value.length <= maxLength;
}
