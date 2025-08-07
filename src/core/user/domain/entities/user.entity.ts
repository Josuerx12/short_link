import { AbstractEntity } from 'src/core/shared/domain/abstracts/entity';
import { UrlEntity } from 'src/core/url/domain/entities/url.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

// @Index('idx_urls_user_id', ['user'])
@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @OneToMany(() => UrlEntity, (url) => url.user)
  urls: UrlEntity[];
}
