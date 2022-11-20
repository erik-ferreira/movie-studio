export function cutMessageErrorFirebase(error: string) {
  const message = error?.substring(17, 36);

  return message;
}
