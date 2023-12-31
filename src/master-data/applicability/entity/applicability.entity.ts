import { Assessment } from 'src/assessment/entity/assessment.entity';
import { Methodology } from 'src/methodology/entity/methodology.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('applicability')
export class ApplicabilityEntity extends MasterData {
  @Column({ default: null })
  uniqueIdentification: string;

  @ManyToOne((type) => Assessment, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  assessment?: Assessment;

  @OneToMany(() => Methodology, (methodology) => methodology.applicability)
  methodologies: Methodology[];
}
