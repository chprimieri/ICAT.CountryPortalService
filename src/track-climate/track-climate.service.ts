import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TrackcaEntity } from './entity/trackca.entity';

@Injectable()
export class TrackClimateService extends TypeOrmCrudService<TrackcaEntity> {
  constructor(@InjectRepository(TrackcaEntity) repo) {
    super(repo);
  }
}
