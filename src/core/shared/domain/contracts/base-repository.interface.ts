import { Transaction } from 'sequelize';

export interface IBaseRepository<Entity, IdT, InputParams, OutputParams> {
  getAll(props: InputParams): Promise<OutputParams>;
  getById(id: IdT, transaction?: Transaction): Promise<Entity | null>;
  create(props: Entity, transaction?: Transaction): Promise<Entity | null>;
  update(props: Entity, transaction?: Transaction): Promise<Entity | null>;
  delete(id: IdT, transaction?: Transaction): Promise<void>;
}
