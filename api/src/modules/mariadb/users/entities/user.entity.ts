import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { BeforeInsert, Column, Entity, OneToOne } from "typeorm";
import { AuthProvider } from "../../auth-providers/entities/auth-provider.entity";
import { generateRandomName } from "src/common/utils/random-name.util";

@Entity()
export class User extends MariadbBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  picture: string

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  authProvider: AuthProvider;

  @BeforeInsert()
  setName() {
    if (!this.name) {
      this.name = generateRandomName();
    }
  }
}


