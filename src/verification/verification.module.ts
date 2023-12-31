import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentModule } from 'src/assessment/assessment.module';
import { AssessmentYear } from 'src/assessment-year/entity/assessment-year.entity';
import { ParameterRequest } from 'src/data-request/entity/data-request.entity';
import { Institution } from 'src/institution/institution.entity';
import { EmailNotificationService } from 'src/notifications/email.notification.service';
import { ParameterHistoryModule } from 'src/parameter-history/parameter-history.module';
import { User } from 'src/users/user.entity';
import { TokenDetails } from 'src/utills/token_details';
import { VerificationDetail } from './entity/verification-detail.entity';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { Parameter } from 'src/parameter/entity/parameter.entity';
import { ParameterModule } from 'src/parameter/parameter.module';
import { AssessmentResult } from 'src/assessment-result/entity/assessment-result.entity';
import { AssessmentResultModule } from 'src/assessment-result/assessment-result.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParameterRequest,
      AssessmentYear,
      VerificationDetail,
      ParameterRequest,
      Institution,
      User,
      Parameter,
      AssessmentResult
    ]),
    ParameterHistoryModule,
    AssessmentModule,
    ParameterModule,
    AssessmentResultModule
  ],
  controllers: [VerificationController],
  providers: [
    VerificationService,
    AssessmentYear,
    VerificationDetail,
    ParameterRequest,
    TokenDetails,
    EmailNotificationService,
    Institution,
  ],
  exports: [VerificationService],
})
export class VerificationModule {}
