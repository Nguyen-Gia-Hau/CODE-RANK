import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class AuthProvider extends MariadbBaseEntity {
  @Column()
  provider: string

  @Column({ unique: true })
  providerId: string

  @OneToOne(() => User, (user) => user.authProvider, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}