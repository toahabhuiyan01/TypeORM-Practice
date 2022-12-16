import { MigrationInterface, QueryRunner } from "typeorm";

export class userTags1669717058149 implements MigrationInterface {
    name = 'userTags1669717058149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "tags" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tags"`);
    }

}
