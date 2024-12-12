
import { MariadbBaseEntity } from 'src/common/entities/mariadb/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends MariadbBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

