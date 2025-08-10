import { BelongsTo, Column, DataType, ForeignKey } from 'sequelize-typescript';
import BaseModel from 'src/core/shared/domain/abstracts/base-model';
import { UserModel } from 'src/core/user/infra/models/user.model';

export type UrlModelProps = {
  id?: string;
  user_id?: string;
  original_url: string;
  short_code: string;
  visit_count: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class UrlModel extends BaseModel<UrlModelProps> {
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  user_id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  original_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  short_code: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  visit_count: number;

  @BelongsTo(() => UserModel)
  user?: Awaited<UserModel>;
}
