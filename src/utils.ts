export function cutMessageErrorFirebase(error: string) {
  const [_, cut] = error.split("(");
  const [message] = cut.split(")");

  return message;
}
