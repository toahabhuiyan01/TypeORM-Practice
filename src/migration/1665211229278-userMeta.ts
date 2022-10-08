import { MigrationInterface, QueryRunner } from "typeorm";

export class userMeta1665211229278 implements MigrationInterface {
    name = 'userMeta1665211229278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user_meta" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_meta"`);
    }

}
