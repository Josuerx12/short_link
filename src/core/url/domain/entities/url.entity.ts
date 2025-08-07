import { AbstractEntity } from 'src/core/shared/domain/abstracts/entity';
import { UrlVisitEntity } from 'src/core/url-visits/domain/entities/url-visit.entity';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('urls')
export class UrlEntity extends AbstractEntity {
  @Column({ type: 'text', name: 'original_url' })
  originalUrl: string;

  @Column({ type: 'varchar', length: 10, name: 'short_code', unique: true })
  shortCode: string;

  @Column({ type: 'int', name: 'visit_count', default: 0 })
  visitCount: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => UrlVisitEntity, (visit) => visit.url)
  visits: UrlVisitEntity[];
}
