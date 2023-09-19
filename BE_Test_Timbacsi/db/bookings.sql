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
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `fullname`, `phonenumber`, `address`, `birthday`, `date`, `time`, `gender`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Trần Duy Nguyễn', '0907497517', 'Ninh Kiều, Cần Thơ', '25-05-2001', '09-06-2023', 'TR - 001', 'Nam', 0, '2023-06-08 11:00:24', '2023-06-08 11:34:14'),
(2, 'Trần Duy Ng', '0907497516', 'Ninh Kiều 1, Cần Thơ', '25-05-2001', '09-06-2023', 'SA - 001', 'Nam', 1, '2023-06-08 11:01:09', '2023-06-08 13:23:52'),
(3, 'Trần Duy Nggg', '0907497515', 'Phong Điền, Cần Thơ', '26-05-2001', '09-06-2023', 'CH - 001', 'Nam', 0, '2023-06-08 11:01:57', '2023-06-08 11:01:57'),
(4, 'Trần Duy Ngggggggg', '0907497514', 'Phong Điền 1, Cần Thơ', '26-05-2001', '10-06-2023', 'TR - 001', 'Nam', 0, '2023-06-08 11:02:33', '2023-06-08 11:02:33'),
(5, 'Trần Duy N', '0907497513', 'Phong Điền 2, Cần Thơ', '26-05-2001', '10-06-2023', 'TR - 002', 'Nam', 0, '2023-06-08 11:03:54', '2023-06-08 11:03:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
