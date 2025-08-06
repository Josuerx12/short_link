import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../shared/domain/abstracts/entity';
import { UrlEntity } from '../../url/domain/entities/url.entity';

@Entity('url_visits')
export class UrlVisitsEntity extends AbstractEntity {
  @ManyToOne(() => UrlEntity, (url) => url.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'url_id' })
  url: UrlEntity;

  @Column({ name: 'accessed_at', type: 'timestamptz', default: () => 'now()' })
  accessedAt: Date;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ipAddress: string | null;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string | null;
}
