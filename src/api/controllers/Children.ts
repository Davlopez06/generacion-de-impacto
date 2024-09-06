import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { children, updateChild } from '../utils/UpdateChild';

export const getChildren = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('gimpacto');
    const children = await db.collection('children').find({}).toArray();
    return res.status(200).json(children);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ message: 'Error get children' });
  }
};

export const postChildren = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('gimpacto');
    const { name, age, points = 0, lastPoint = 0 } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: 'Name and age are required' });
    }

    const children = { name, age, points, lastPoint: { points: lastPoint, date: new Date() } };
    const result = await db.collection('children').insertOne(children);
    return res.status(201).json(result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ message: 'Error post children' });
  }
};

export const putChildren = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('gimpacto');
    const { _id, points, lastPoint } = req.body;

    if (!_id || !points || !lastPoint) {
      return res.status(400).json({ message: 'ID, points, and laspoints are required' });
    }
    const objectId = new ObjectId(_id);
    const existingChild = await db.collection('children').findOne({ _id: objectId });

    if (!existingChild) {
      return res.status(404).json({ message: 'Children not found' });
    }

    const newChild: children = updateChild(existingChild?.points, existingChild?.lastPoint?.points, existingChild?.lastPoint?.date, points, lastPoint);
    const result = await db.collection('children').updateOne({ _id: objectId }, { $set: { ...newChild } });
    return res.status(200).json(result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
};
