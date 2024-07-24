/*
  Warnings:

  - You are about to drop the column `bulan` on the `tagihan` table. All the data in the column will be lost.
  - You are about to drop the column `tahun` on the `tagihan` table. All the data in the column will be lost.
  - You are about to drop the `pembayaran` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tanggal_tagihan` to the `tagihan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pembayaran` DROP FOREIGN KEY `pembayaran_id_tagihan_fkey`;

-- AlterTable
ALTER TABLE `tagihan` DROP COLUMN `bulan`,
    DROP COLUMN `tahun`,
    ADD COLUMN `tanggal_tagihan` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `pembayaran`;
