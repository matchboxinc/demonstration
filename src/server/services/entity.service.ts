import { readJsonFile, writeJsonFile } from './helpers';
import { Entity, Filters } from '../models';

export abstract class EntityService<T extends Entity> {
	abstract fileName: string;

	abstract validatePostEntity(params: { entity: Omit<T, 'id'> }): void;

	abstract validatePatchEntity(params: { entity: Partial<T> & Pick<T, 'id'> }): void;

	getEntities({ filters }: { filters?: Filters<T> } = {}): T[] {
		let entities = readJsonFile<T[]>({ fileName: this.fileName });
		if (filters !== undefined) {
			Object.entries(filters).forEach((filterEntry) => {
				const [filterKey, filterValue] = filterEntry;
				entities = entities.filter((entity) => filterValue.includes(entity[filterKey as keyof T]));
			});
		}
		return entities;
	}

	createNewEntity({ newEntity }: { newEntity: Omit<T, 'id'> }): T {
		this.validatePostEntity({ entity: newEntity });
		const savedEntities = this.getEntities();
		const lastSavedEntity = savedEntities[savedEntities.length - 1];
		const createdEntity = { ...newEntity, id: lastSavedEntity.id + 1 } as T;
		savedEntities.push(createdEntity);
		writeJsonFile({ fileName: this.fileName, data: savedEntities });
		return createdEntity;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	updateEntity({ updatedEntity }: { updatedEntity: Partial<T> & Pick<T, 'id'> }): T {
		let createdEntity = { ...updatedEntity, id: updatedEntity.id } as T;
		this.validatePatchEntity({ entity: updatedEntity });
		const savedEntities = this.getEntities();
		for (const T of savedEntities) {
			if (T.id === updatedEntity.id) {
				const ind = savedEntities.indexOf(T);
				if (updatedEntity === undefined) {
					throw new Error('updatedEntity is undefined');
				}
				createdEntity = { ...updatedEntity, id: T.id } as T;
				savedEntities.splice(ind, 1, createdEntity);
			}
		}
		return createdEntity;
	}
}
