import { MigrationInterface, QueryRunner } from "typeorm";

export class contactMetadata1665669506464 implements MigrationInterface {
    name = 'contactMetadata1665669506464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."date_index"`);
        await queryRunner.query(`DROP INDEX "public"."contact_phone_index"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "meta_data" json`);
        await queryRunner.query(`CREATE INDEX "IDX_8c17e6f04bd3fdd6053f3e7ebe" ON "contact" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea7244afe014b693c35932e449" ON "contact" ("phone_number") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ea7244afe014b693c35932e449"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c17e6f04bd3fdd6053f3e7ebe"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "meta_data"`);
        await queryRunner.query(`CREATE INDEX "contact_phone_index" ON "contact" ("phone_number") `);
        await queryRunner.query(`CREATE INDEX "date_index" ON "contact" ("name") `);
    }

}
