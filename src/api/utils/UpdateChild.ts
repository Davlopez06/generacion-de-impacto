interface laspoints {
  points: number;
  date: Date;
}

export interface children {
  lastPoint?: laspoints;
  points?: number;
}

export const updateChild = (existingChildPoints: number, existingChildLastPoints: number, existingChildDate: Date, points: number, laspoints: number) => {
  const newChild: children = {};
  newChild.points = existingChildPoints + points;

  if (new Date().getDay() === new Date(existingChildDate).getDay()) {
    newChild.lastPoint = {
      points: existingChildLastPoints + laspoints,
      date: new Date(),
    };
  } else {
    newChild.lastPoint = {
      points: laspoints,
      date: new Date(),
    };
  }
  return newChild;
};
