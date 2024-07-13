-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomor_meteran` VARCHAR(191) NOT NULL,
    `telepon` INTEGER NOT NULL,
    `alamat` TEXT NOT NULL,

    UNIQUE INDEX `pelanggan_email_key`(`email`),
    UNIQUE INDEX `pelanggan_nomor_meteran_key`(`nomor_meteran`),
    UNIQUE INDEX `pelanggan_telepon_key`(`telepon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tagihan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_tagihan` INTEGER NOT NULL,
    `bulan` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `id_pelanggan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_pembayaran` VARCHAR(191) NOT NULL,
    `jumlah_pembayaran` INTEGER NOT NULL,
    `id_tagihan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tagihan` ADD CONSTRAINT `tagihan_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_id_tagihan_fkey` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
