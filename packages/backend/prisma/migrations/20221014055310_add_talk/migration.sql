-- CreateTable
CREATE TABLE `Talk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TalkInvitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `talkId` INTEGER NOT NULL,
    `inviterId` INTEGER NOT NULL,
    `inviteeId` INTEGER NOT NULL,
    `invitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acceptedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TalkToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TalkToUser_AB_unique`(`A`, `B`),
    INDEX `_TalkToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TalkInvitation` ADD CONSTRAINT `TalkInvitation_talkId_fkey` FOREIGN KEY (`talkId`) REFERENCES `Talk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TalkInvitation` ADD CONSTRAINT `TalkInvitation_inviterId_fkey` FOREIGN KEY (`inviterId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TalkInvitation` ADD CONSTRAINT `TalkInvitation_inviteeId_fkey` FOREIGN KEY (`inviteeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TalkToUser` ADD CONSTRAINT `_TalkToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Talk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TalkToUser` ADD CONSTRAINT `_TalkToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
