-- DropForeignKey
ALTER TABLE `Aluno` DROP FOREIGN KEY `Aluno_imagemId_fkey`;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_imagemId_fkey` FOREIGN KEY (`imagemId`) REFERENCES `Imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
