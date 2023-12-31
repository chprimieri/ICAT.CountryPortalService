import { Assessment } from 'src/assessment/entity/assessment.entity';
import { AssessmentYear } from 'src/assessment-year/entity/assessment-year.entity';
import { ProjectionResult } from 'src/projection-result/entity/projection-result.entity';
import { QuAlityCheckStatus } from 'src/quality-check/entity/quality-check-status.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'assessmentResult' })
export class AssessmentResult extends BaseTrackingEntity {
  constructor() {
    super();
    this.status = 0;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  baselineResult: number;

  @Column({ default: null })
  baselineResultUnit: string;

  @Column({ default: null })
  projectResult: number;

  @Column({ default: null })
  projectResultUnit: string;

  @Column({ default: null })
  lekageResult: number;

  @Column({ default: null })
  lekageResultUnit: string;

  @Column({ default: null })
  totalEmission: number;

  @Column({ default: null })
  totalEmissionUnit: string;

  @Column({ default: null })
  bsTotalAnnualCost: number;

  @Column({ default: null })
  psTotalAnnualCost: number;

  @Column({ default: null })
  costDifference: number;

  @Column({ default: null })
  macResult: number;

  @Column({ default: null })
  qcComment: string;

  @Column({ default: null })
  qcStatusBaselineResult: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatuProjectResult: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatusLekageResult: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatusTotalEmission: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatusmacResult: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatuscostDifference: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatuspsTotalAnnualCost: QuAlityCheckStatus;

  @Column({ default: null })
  qcStatusbsTotalAnnualCost: QuAlityCheckStatus;

  @OneToOne((type) => AssessmentYear)
  @JoinColumn()
  assessmentYear: AssessmentYear;

  @Column({default: false})
  isResultupdated: boolean;

  @Column({default: false})
  isResultRecalculating: boolean;

  @ManyToOne((type) => Assessment, { cascade: false, nullable: true })
  @JoinColumn()
  assessment: Assessment;

  @OneToMany(
    () => ProjectionResult,
    (projectiondata) => projectiondata.assessmentResult,
  )
  projectionResult: ProjectionResult[];
}
