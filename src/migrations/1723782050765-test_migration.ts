import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1723782050765 implements MigrationInterface {
    name = 'TestMigration1723782050765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "notitokens" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clips" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_cdb959a37f95935a5d30460dc3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jokes" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_ce9a1729216a79f4abd1e3774dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jokes"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "clips"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
