import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { DifficultyLevelsController } from '@server/controllers/difficultyLevels.controller';

const difficultyLevelsController = new DifficultyLevelsController();

const getDifficultyLevelsHandler = (req: NextApiRequest, res: NextApiResponse): void => {
	switch (req.method) {
		case 'GET': {
			difficultyLevelsController.getEntity(req, res);
			break;
		}
		default: {
			res.status(StatusCodes.NOT_FOUND).end();
		}
	}
};

export default getDifficultyLevelsHandler;
