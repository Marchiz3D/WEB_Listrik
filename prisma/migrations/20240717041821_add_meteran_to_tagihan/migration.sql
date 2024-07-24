/*
  Warnings:

  - Added the required column `meteran` to the `tagihan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tagihan` ADD COLUMN `meteran` INTEGER NOT NULL;
