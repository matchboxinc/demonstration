import { EntityService } from './entity.service';
import { DifficultyLevel } from '../models';

export class DifficultyLevelsService extends EntityService<DifficultyLevel> {
	fileName = 'data/difficulty_levels.json';

	validatePostEntity = (): void => {
		throw new Error('Cannot POST a Difficulty Level');
	};

	validatePatchEntity = (): void => {
		throw new Error('Cannot PATCH a Difficulty Level');
	};
}
