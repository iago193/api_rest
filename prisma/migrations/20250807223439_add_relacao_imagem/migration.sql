/*
  Warnings:

  - A unique constraint covering the columns `[imagemId]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Aluno` ADD COLUMN `imagemId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Imagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Aluno_imagemId_key` ON `Aluno`(`imagemId`);

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_imagemId_fkey` FOREIGN KEY (`imagemId`) REFERENCES `Imagem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
