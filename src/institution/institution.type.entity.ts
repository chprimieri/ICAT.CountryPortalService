import { MasterData } from 'src/shared/entities/master.data.entity';
import { UserType } from 'src/users/user.type.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class InstitutionType extends MasterData {
  @ManyToMany((type) => UserType, {
    eager: true,
    cascade: false,
  })
  @JoinTable({ name: 'instype_usertype' })
  userType: UserType[];
}
