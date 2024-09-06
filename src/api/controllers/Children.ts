import { NextApiRequest, NextApiResponse } from 'next';

export const getChildren = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ response: 'Api get children' });
};

export const postChildren = (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body;
  return res.status(200).json({ response: message });
};
