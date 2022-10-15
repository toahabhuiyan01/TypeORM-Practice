import { MigrationInterface, QueryRunner } from "typeorm"

export class userMetaDate1665659637604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX contact_phone_index ON contact USING brin(phone_number)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."contact_phone_index"`);
    }
}
