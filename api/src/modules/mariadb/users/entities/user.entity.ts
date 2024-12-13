import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AuthProvider } from "../../auth-providers/entities/auth-provider.entity";

@Entity()
export class User extends MariadbBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  picture: string

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  authProvider: AuthProvider;
}


