-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2023 at 04:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timbacsi_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `iddv` int(11) DEFAULT NULL,
  `idbn` int(11) DEFAULT NULL,
  `hoten` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `gioitinh` varchar(255) DEFAULT NULL,
  `stt` int(11) DEFAULT NULL,
  `buoikham` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `active` varchar(255) DEFAULT NULL,
  `ngaykham` date DEFAULT NULL,
  `ngaydat` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `iddv`, `idbn`, `hoten`, `sdt`, `ngaysinh`, `diachi`, `gioitinh`, `stt`, `buoikham`, `time`, `active`, `ngaykham`, `ngaydat`, `createdAt`, `updatedAt`) VALUES
(1, 4, 6, 'Luong Vu Khoa', '0366655650', '2023-06-04 07:00:00', 'DT', 'Nam', 15, 'Trưa', '11:00-13:00', '0', '2023-06-30 00:00:00', '2023-06-25 01:21:45', '2023-06-25 01:21:45', '2023-06-25 01:21:45'),
(2, 4, 6, 'Luong Vu Khoa', '0366655650', '2023-06-04 07:00:00', 'DT', 'Nam', 3, 'Sáng', '7:00-9:00', '0', '2023-06-30 00:00:00', '2023-06-25 01:24:23', '2023-06-25 01:24:23', '2023-06-25 01:24:23'),
(3, 4, 6, 'Luong Vu Khoa', '0366655650', '2023-06-04 07:00:00', 'DT', 'Nam', 3, 'Sáng', '7:00-9:00', '0', '2023-06-30 00:00:00', '2023-06-25 01:33:49', '2023-06-25 01:33:49', '2023-06-25 01:33:49'),
(4, 4, 6, 'Luong Vu Khoa', '0366655650', '2023-06-04 07:00:00', 'DT', 'Nam', 16, 'Trưa', '11:00-13:00', '0', '2023-06-30 00:00:00', '2023-06-25 21:57:11', '2023-06-25 21:57:12', '2023-06-25 21:57:12'),
(5, 4, 10, 'kieu duyen', '0776887349', '2023-05-28 07:00:00', 'vl', 'Nam', 17, 'Trưa', '11:00-13:00', '0', '2023-06-30 00:00:00', '2023-06-25 21:58:38', '2023-06-25 21:58:38', '2023-06-25 21:58:38');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `SDT` varchar(255) DEFAULT NULL,
  `ngay` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `hovaten` varchar(255) DEFAULT NULL,
  `name_bacsi` varchar(255) DEFAULT NULL,
  `chandoan` varchar(255) DEFAULT NULL,
  `donthuoc` varchar(255) DEFAULT NULL,
  `ketquaCLS` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `SDT`, `ngay`, `username`, `password`, `hovaten`, `name_bacsi`, `chandoan`, `donthuoc`, `ketquaCLS`, `createdAt`, `updatedAt`) VALUES
(1, '0366655650', '2023-06-22 19:47:05', '123', '12121', 'fgdf', 'wrq', 'asd', 'jh', 'asda', '2023-06-21 14:47:05', '2023-06-21 14:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `hosodonvis`
--

CREATE TABLE `hosodonvis` (
  `id` int(11) NOT NULL,
  `tendv` varchar(255) DEFAULT NULL,
  `tenbs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hosodonvis`
--

INSERT INTO `hosodonvis` (`id`, `tendv`, `tenbs`, `createdAt`, `updatedAt`) VALUES
(57, 'PHÒNG KHÁM CHUYÊN KHOA NHI', 'BS. TRẦN CAO THÁI', '2023-06-21 17:05:10', '2023-06-21 17:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `lichkhams`
--

CREATE TABLE `lichkhams` (
  `id` int(11) NOT NULL,
  `iddv` int(11) DEFAULT NULL,
  `mabuoisa` varchar(255) DEFAULT NULL,
  `mabuoitr` varchar(255) DEFAULT NULL,
  `mabuoich` varchar(255) DEFAULT NULL,
  `sang` varchar(255) DEFAULT NULL,
  `trua` varchar(255) DEFAULT NULL,
  `chieu` varchar(255) DEFAULT NULL,
  `batdausa` varchar(255) DEFAULT NULL,
  `batdautr` varchar(255) DEFAULT NULL,
  `batdauch` varchar(255) DEFAULT NULL,
  `ketthucsa` varchar(255) DEFAULT NULL,
  `ketthuctr` varchar(255) DEFAULT NULL,
  `ketthucch` varchar(255) DEFAULT NULL,
  `slsaHientai` int(11) DEFAULT NULL,
  `sltrHientai` int(11) DEFAULT NULL,
  `slchHientai` int(11) DEFAULT NULL,
  `slsa` int(11) DEFAULT NULL,
  `sltr` int(11) DEFAULT NULL,
  `slch` int(11) DEFAULT NULL,
  `ngay` date DEFAULT NULL,
  `chovuotsa` int(11) DEFAULT NULL,
  `chovuottr` int(11) DEFAULT NULL,
  `chovuotch` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lichkhams`
--

INSERT INTO `lichkhams` (`id`, `iddv`, `mabuoisa`, `mabuoitr`, `mabuoich`, `sang`, `trua`, `chieu`, `batdausa`, `batdautr`, `batdauch`, `ketthucsa`, `ketthuctr`, `ketthucch`, `slsaHientai`, `sltrHientai`, `slchHientai`, `slsa`, `sltr`, `slch`, `ngay`, `chovuotsa`, `chovuottr`, `chovuotch`, `createdAt`, `updatedAt`) VALUES
(1, 4, 'Sáng', 'Trưa', 'Chiều', 'ONL', 'ONL', 'ONL', '7:00', '11:00', '17:00', '9:00', '13:00', '20:00', 8, 17, 3, 2, 20, 2, '2023-06-30', 1, 1, 1, '2023-06-24 15:53:34', '2023-06-25 21:58:38');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-booking.js'),
('migration-create-history.js'),
('migration-create-hosodonvi.js'),
('migration-create-lichkham.js'),
('migration-create-thongtinbenhnhan.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `thongtinbenhnhans`
--

CREATE TABLE `thongtinbenhnhans` (
  `id` int(11) NOT NULL,
  `Ho` varchar(255) DEFAULT NULL,
  `Ten` varchar(255) DEFAULT NULL,
  `Ngaysinh` date DEFAULT NULL,
  `Dienthoai` varchar(255) DEFAULT NULL,
  `Gioitinh` varchar(255) DEFAULT NULL,
  `Diachi` varchar(255) DEFAULT NULL,
  `Trieuchung` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thongtinbenhnhans`
--

INSERT INTO `thongtinbenhnhans` (`id`, `Ho`, `Ten`, `Ngaysinh`, `Dienthoai`, `Gioitinh`, `Diachi`, `Trieuchung`, `createdAt`, `updatedAt`) VALUES
(6, 'Luong', 'Vu Khoa', '2023-06-04', '0366655650', 'Nam', 'DT', 'Ho, Sot', '2023-06-22 02:00:29', '2023-06-22 02:00:29'),
(7, 'decie', 'k', '2023-05-28', '0366655651', 'Nam', 'vl', 'đáng yêu', '2023-06-25 01:15:07', '2023-06-25 01:15:07'),
(8, 'Luong', 'Vu Khoa11', '2023-06-04', '0366655650', 'Nu', 'DT', 'Ho, Sot', '2023-06-25 01:38:03', '2023-06-25 01:38:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `name_clinic` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `CM_heart` int(11) DEFAULT NULL,
  `CS_heart` int(11) DEFAULT NULL,
  `TĐ_heart` int(11) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `name_clinic`, `phonenumber`, `address`, `username`, `password`, `CM_heart`, `CS_heart`, `TĐ_heart`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, 'BSCK2. TRẦN CAO THÁI', 'Bệnh viện Đa Khoa Thành Phố Cần Thơ', '0292 3821 236', '04 Đường Châu Văn Liêm, Tân An, Ninh Kiều', 'tk1', 'mk1', 146234, 136987, 146231, '10.030877999968384', '105.78275242405057', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(2, 'BSCK2. ĐỖ BÙI NHỰT TÂN', 'Bệnh viện Đa Khoa Trung Ương Cần Thơ', '090 121 51 15', '315 Đ. Nguyễn Văn Linh, Phường An Khánh, Ninh Kiều', 'tk2', 'mk2', 145965, 135900, 145725, '10.029169719759699', '105.75559441127544', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(3, 'BSCK2. TRẦN LÊ BÍCH HẰNG', 'Bệnh viện Tim Mạch Thành Phố Cần Thơ', '0292 3832 149', '204 Trần Hưng Đạo, P. An Nghiệp, Q. Ninh Kiều', 'tk3', 'mk3', 145965, 135900, 145725, '10.03502148718993', '105.7751540632525', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(4, 'BSCK2. Hà Anh Duy', 'Bệnh viện Nhi Đồng Thành Phố Cần Thơ', '02923731004', '345 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều', 'tk4', 'mk4', 145965, 135900, 145725, '10.01712269262043', '105.73919577563524', '2023-04-24 03:20:35', '2023-04-24 03:20:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hosodonvis`
--
ALTER TABLE `hosodonvis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lichkhams`
--
ALTER TABLE `lichkhams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `thongtinbenhnhans`
--
ALTER TABLE `thongtinbenhnhans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hosodonvis`
--
ALTER TABLE `hosodonvis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `lichkhams`
--
ALTER TABLE `lichkhams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thongtinbenhnhans`
--
ALTER TABLE `thongtinbenhnhans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
