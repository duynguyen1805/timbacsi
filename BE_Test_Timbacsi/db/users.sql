-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2023 at 04:44 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `name_clinic` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `CM_heart` int(11) DEFAULT NULL,
  `CS_heart` int(11) DEFAULT NULL,
  `TĐ_heart` int(11) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `name_clinic`, `phonenumber`, `address`, `CM_heart`, `CS_heart`, `TĐ_heart`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, 'BSCK2. TRẦN CAO THÁI', 'Bệnh viện Đa Khoa Thành Phố Cần Thơ', '0292 3821 236', '04 Đường Châu Văn Liêm, Tân An, Ninh Kiều', 146234, 136987, 146231, '10.030877999968384', '105.78275242405057', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(2, 'BSCK2. ĐỖ BÙI NHỰT TÂN', 'Bệnh viện Đa Khoa Trung Ương Cần Thơ', '090 121 51 15', '315 Đ. Nguyễn Văn Linh, Phường An Khánh, Ninh Kiều', 145965, 135900, 145725, '10.029169719759699', '105.75559441127544', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(3, 'BSCK2. TRẦN LÊ BÍCH HẰNG', 'Bệnh viện Tim Mạch Thành Phố Cần Thơ', '0292 3832 149', '204 Trần Hưng Đạo, P. An Nghiệp, Q. Ninh Kiều', 145965, 135900, 145725, '10.03502148718993', '105.7751540632525', '2023-04-24 03:20:35', '2023-04-24 03:20:35'),
(4, 'BSCK2. Hà Anh Duy', 'Bệnh viện Nhi Đồng Thành Phố Cần Thơ', '02923731004', '345 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều', 145965, 135900, 145725, '10.01712269262043', '105.73919577563524', '2023-04-24 03:20:35', '2023-04-24 03:20:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
