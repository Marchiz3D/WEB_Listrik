/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `pelanggan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `pelanggan` DROP COLUMN `role`;
