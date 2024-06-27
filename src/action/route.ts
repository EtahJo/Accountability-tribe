// import { db } from '@/lib/db';
// import { getTribeById } from '@/data/tribe';
// import { NextRequest, NextResponse } from 'next/server';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function GET(req: NextApiRequest, res: NextResponse) {
//   return NextResponse.json({
//     hello: 'world',
//   });
  // const { id } = req.query;
  // if (req.method == 'GET') {
  //   try {
  //     const tribe = await getTribeById(id as string);
  //     console.log(tribe);
  //     if (!tribe) {
  //       return res.status(404).json({ error: 'Tribe not found' });
  //     }
  //     res.status(200).json(tribe);
  //   } catch {
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // } else {
  //   res.status(405).json({ error: 'Method Not Allowed' });
  // }
}
