import { Column, DataType, Model } from 'sequelize-typescript';

export default class BaseModel<
  TModel extends object = any,
> extends Model<TModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: true,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: true,
  })
  declare updated_at: Date;
}
