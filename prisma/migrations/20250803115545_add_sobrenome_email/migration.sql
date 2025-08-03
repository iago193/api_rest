/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobrenome` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Aluno` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `sobrenome` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Aluno_email_key` ON `Aluno`(`email`);
