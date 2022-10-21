import { EntityController } from './entity.controller';
import { DifficultyLevelsService } from '../services/difficultyLevels.service';
import { DifficultyLevel, PostModel } from '../models';

export class DifficultyLevelsController extends EntityController<DifficultyLevel> {
	service = new DifficultyLevelsService();

	validatePostModel = (_model: unknown): _model is PostModel => {
		throw new Error('Cannot POST a Difficulty Level');
	};

	validatePatchModel = (_model: unknown): _model is Partial<DifficultyLevel> => {
		throw new Error('Cannot PATCH a Difficulty Level');
	};

	convertToEntity = (): DifficultyLevel => {
		throw new Error('Cannot POST a Difficulty Level');
	};
}
