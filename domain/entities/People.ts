import Points from './Points';

export default class People {
  id?: string;
  name: string;
  age: number;
  birthdate: string;
  biblePoint: Points;

  constructor({ id, name, age, birthdate, biblePoint }: People) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.birthdate = birthdate;
    this.biblePoint = new Points({
      name: biblePoint.name,
      point: biblePoint.point,
    });
  }
}
