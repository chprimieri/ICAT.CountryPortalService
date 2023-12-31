import { DefaultValue } from 'src/default-value/entity/defaultValue.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountrySector } from './country-sector.entity';
import { countryStatus } from './country-status.entity';

@Entity({ name: 'country' })
export class Country extends BaseTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  code: string;

  @Column({ default: null })
  code_extended: string;

  @Column({ default: null })
  name: string;

  @Column({ length: 300, default: null })
  description: string;

  @Column({ default: 1 })
  sortOrder: number;

  @Column()
  submissions: string;

  @Column({ default: null })
  emissionSummary: string;

  @Column({ default: null })
  ndcDocuments: string;

  @Column({ default: null })
  isSystemUse: boolean;

  @Column({ default: null })
  flagPath: string;

  @Column({ default: null })
  registeredDate: Date;

  @Column({ default: null })
  isMember: boolean;

  @Column({ default: null })
  countryStatus: countryStatus;

  @Column({ default: null })
  region: string;

  @Column({ default: null })
  climateActionModule: boolean;

  @Column({ default: null })
  ghgModule: boolean;

  @Column({ default: null })
  macModule: boolean;

  @Column({ default: null })
  dataCollectionModule: boolean;

  @Column({ default: null })
  dataCollectionGhgModule: boolean;

  @Column({ default: null })
  hasExelTem: boolean;

  @Column({ default: null })
  uniqueIdentification: string;

  @Column({ default: null })
  telephoneLength: number;
  
  @Column({ default: null })
  uniqtelephone: number;

  @OneToMany(() => DefaultValue, (defaultValue) => defaultValue.country,{cascade:false})
  defaultValue: DefaultValue[]
}
