import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

export type DocumentType = 'sop' | 'sop_kannada' | 'agreement' | 'property_declaration' | 'code_of_conduct';

@Entity('admin_documents')
export class AdminDocument extends BaseEntity {
  @Column({ type: 'varchar' })
  documentType!: DocumentType;

  @Column({ type: 'text' })
  documentUrl!: string;

  @Column({ type: 'varchar', nullable: true })
  version?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;
}
