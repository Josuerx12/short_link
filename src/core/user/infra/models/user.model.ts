import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from 'src/core/shared/domain/abstracts/base-model';

export type UserModelProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserModel extends BaseModel<UserModelProps> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
