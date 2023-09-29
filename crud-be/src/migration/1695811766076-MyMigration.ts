import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1695811766076 implements MigrationInterface {
    name = 'MyMigration1695811766076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "image"`);
    }

}
