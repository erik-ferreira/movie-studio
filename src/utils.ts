export function cutMessageErrorFirebase(error: string) {
  const [_, cut] = error.split("(");
  const [message] = cut.split(")");

  return message;
}

export function fixDateMovie(date: string) {
  const day = new Date(date);
  let moreOneDay = new Date(day);
  moreOneDay.setDate(day.getDate() + 1);
  moreOneDay.toLocaleDateString();

  const [dateCut, _] = moreOneDay.toISOString().split("T");
  const completeFormat = dateCut.split("-").reverse().join("/");

  return completeFormat;
}
