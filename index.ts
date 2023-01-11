export type HillBilly = {
  name: string,
  age: number,
  hobbies?: string[],
  loveInterests?: string[],
}

export function arr2list (arr: string[]): string {
  let str = arr.length > 1 ? 'and ' : '';
  str += arr.pop();
  while (arr.length) {
    str = arr.pop() + ', ' + str;
  }
  return str;
}

export function getInfo(person: HillBilly): string {
  const {name, age, hobbies, loveInterests} = person;
  let bio = `Biography: ${name} is ${age} years old.`;
  if (hobbies?.length)
    bio += ` ${name} enjoys ${arr2list(hobbies)}.`
  if (loveInterests?.length)
    bio += ` ${name} has the hots for ${arr2list(loveInterests)}.`
  return bio;
}
