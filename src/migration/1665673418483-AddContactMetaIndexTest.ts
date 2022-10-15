import { MigrationInterface, QueryRunner } from "typeorm"

export class AddContactMetaIndexTest1665673418483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX user_metadata_date ON contact USING brin((meta_data->>'address'), id, (meta_data->>'date'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_metadata_date"`);
    }

}
