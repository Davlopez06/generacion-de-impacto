import { getChildren, postChildren } from '@/api/controllers/Children';
import { NextApiRequest, NextApiResponse } from 'next';

const index = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') return postChildren(req, res);

  return getChildren(req, res);
};

export default index;
