-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 01:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `bayoutfeedpallet`
--

CREATE TABLE `bayoutfeedpallet` (
  `SlNo` int(100) NOT NULL,
  `TruckPositionName` varchar(100) NOT NULL,
  `ZotbNumber` varchar(100) NOT NULL,
  `TruckNumber` varchar(100) NOT NULL,
  `TruckInPresence` int(100) NOT NULL,
  `LoadingStatus` varchar(100) NOT NULL,
  `TelescopicConveyorStatus` varchar(100) NOT NULL,
  `LoadingDateandTime` datetime(6) NOT NULL,
  `LoadingBayFixedPallet` int(100) NOT NULL,
  `LoadingBayCurrentPallet` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bayoutfeedpallet`
--

INSERT INTO `bayoutfeedpallet` (`SlNo`, `TruckPositionName`, `ZotbNumber`, `TruckNumber`, `TruckInPresence`, `LoadingStatus`, `TelescopicConveyorStatus`, `LoadingDateandTime`, `LoadingBayFixedPallet`, `LoadingBayCurrentPallet`) VALUES
(1, 'LOADING BAY1', 'DMS TSYL 102', 'KA-07-F-2011', 1, '0', 'RUNNING', '2023-08-02 16:04:52.000000', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dmsposition`
--

CREATE TABLE `dmsposition` (
  `SlNo` int(11) NOT NULL,
  `PositionTagName` varchar(100) NOT NULL,
  `PositionTagDescription` varchar(100) NOT NULL,
  `PositionId` int(11) NOT NULL,
  `PreviousPositionId` int(11) NOT NULL,
  `LiveId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dmsposition`
--

INSERT INTO `dmsposition` (`SlNo`, `PositionTagName`, `PositionTagDescription`, `PositionId`, `PreviousPositionId`, `LiveId`) VALUES
(1, 'EMAMI DMS PT PALLLET TRACKING RO 91 02 PP', 'CT60RO9102', 124, 11, 23);

-- --------------------------------------------------------

--
-- Table structure for table `dockwiseoutfeed`
--

CREATE TABLE `dockwiseoutfeed` (
  `SlNo` int(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `PalletSections` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `Batch No` varchar(100) NOT NULL,
  `QuantityLoadingBay` varchar(100) NOT NULL,
  `PalletMaterialLoadedCount` varchar(100) NOT NULL,
  `PalletMaterialDockCount` varchar(100) NOT NULL,
  `LoadingDateAndTime` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emptypalletinfeed`
--

CREATE TABLE `emptypalletinfeed` (
  `SlNo` int(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `StackerName` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `StackerPalletGroupMember` varchar(100) NOT NULL,
  `PalletinDateandTime` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faulthistory`
--

CREATE TABLE `faulthistory` (
  `SlNo` int(100) NOT NULL,
  `EquipmentName` varchar(100) NOT NULL,
  `EquipmentDescription` varchar(100) NOT NULL,
  `AlarmName` varchar(100) NOT NULL,
  `AlarmDescription` varchar(100) NOT NULL,
  `AlarmOccurDate` date NOT NULL,
  `AlarmOccurTime` time(6) NOT NULL,
  `AlarmResolvedDate` date NOT NULL,
  `AlarmResolvedTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faulthistory`
--

INSERT INTO `faulthistory` (`SlNo`, `EquipmentName`, `EquipmentDescription`, `AlarmName`, `AlarmDescription`, `AlarmOccurDate`, `AlarmOccurTime`, `AlarmResolvedDate`, `AlarmResolvedTime`) VALUES
(1, 'refinary', 'refinary  not working properly', 'Alert', 'Alert message displayed', '2023-08-07', '12:36:46.527000', '2023-08-08', '19:36:46.556000');

-- --------------------------------------------------------

--
-- Table structure for table `floor`
--

CREATE TABLE `floor` (
  `cardIndex` varchar(100) NOT NULL,
  `area` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `floor`
--

INSERT INTO `floor` (`cardIndex`, `area`) VALUES
('2AL1', 'area1'),
('2AL155', 'area1'),
('2AL160', 'area1'),
('2AL215', 'area1'),
('2AL56', 'area1'),
('2BL1', 'area2'),
('2BL10', 'area2'),
('2BL101', 'area2'),
('2BL104', 'area2'),
('2BL149', 'area2'),
('2BL155', 'area2'),
('2BL2', 'area2'),
('2BL214', 'area2'),
('2BL3', 'area2'),
('2BL328', 'area2'),
('2BL4', 'area2'),
('2BL49', 'area2'),
('2BL5', 'area2'),
('2BL52', 'area2'),
('2BL53', 'area2'),
('2BL56', 'area2'),
('2BL7', 'area2'),
('2BL9', 'area2');

-- --------------------------------------------------------

--
-- Table structure for table `floorwiseproduct`
--

CREATE TABLE `floorwiseproduct` (
  `SlNo` int(100) NOT NULL,
  `FloorName` varchar(100) NOT NULL,
  `ProductName` varchar(100) NOT NULL,
  `Priority` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `floorwiseproduct`
--

INSERT INTO `floorwiseproduct` (`SlNo`, `FloorName`, `ProductName`, `Priority`) VALUES
(2, 'Floor 1', 'Pouch', 1);

-- --------------------------------------------------------

--
-- Table structure for table `infeedlive`
--

CREATE TABLE `infeedlive` (
  `SlNo` int(100) NOT NULL,
  `Mission` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `Batch No` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `StartTime` time(4) NOT NULL,
  `EndDate` date NOT NULL,
  `EndTime` time(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locationreport`
--

CREATE TABLE `locationreport` (
  `SlNo` int(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `PositionType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lockactivity`
--

CREATE TABLE `lockactivity` (
  `SlNo` int(100) NOT NULL,
  `Floor Name` varchar(100) NOT NULL,
  `FloorDescription` varchar(100) NOT NULL,
  `AreaName` varchar(100) NOT NULL,
  `AreaDescription` varchar(100) NOT NULL,
  `LockComments` varchar(100) NOT NULL,
  `LockActivity` varchar(100) NOT NULL,
  `LockStartDate` date NOT NULL,
  `LockStartTime` time(6) NOT NULL,
  `LockEndDate` date NOT NULL,
  `LockEndTime` time(6) NOT NULL,
  `LockUserName` varchar(100) NOT NULL,
  `UnlockUserName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loggeractivity`
--

CREATE TABLE `loggeractivity` (
  `SlNo` int(100) NOT NULL,
  `ModuleName` varchar(100) NOT NULL,
  `LogMessage` varchar(100) NOT NULL,
  `LogUserName` varchar(100) NOT NULL,
  `LogDate` date NOT NULL,
  `LogTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manageaccesscontrol`
--

CREATE TABLE `manageaccesscontrol` (
  `SlNo` int(100) NOT NULL,
  `ModuleName` varchar(100) NOT NULL,
  `Admin` varchar(100) NOT NULL,
  `Planner` varchar(100) NOT NULL,
  `Dock` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manageaccesscontrol`
--

INSERT INTO `manageaccesscontrol` (`SlNo`, `ModuleName`, `Admin`, `Planner`, `Dock`) VALUES
(1, 'ASRS visualistion', 'yes', 'no', 'no'),
(2, 'Control', 'yes', 'yes', 'no'),
(3, 'Master', 'yes', 'no', 'no'),
(4, 'Report', 'yes', 'yes', 'no'),
(5, 'SystemSettings', 'yes', 'no', 'no'),
(6, 'Monitor', 'yes', 'yes', 'no'),
(7, 'DMS', 'yes', 'yes', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `manageproduct`
--

CREATE TABLE `manageproduct` (
  `SlNo` int(100) NOT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `ProductDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manageproduct`
--

INSERT INTO `manageproduct` (`SlNo`, `ProductName`, `ProductDescription`) VALUES
(2, 'Pouch', '908ml');

-- --------------------------------------------------------

--
-- Table structure for table `managerole`
--

CREATE TABLE `managerole` (
  `SlNo` int(100) NOT NULL,
  `RoleName` varchar(100) NOT NULL,
  `RoleDescription` varchar(100) NOT NULL,
  `RoleDate` date NOT NULL,
  `RoleTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managerole`
--

INSERT INTO `managerole` (`SlNo`, `RoleName`, `RoleDescription`, `RoleDate`, `RoleTime`) VALUES
(1, 'Admin', 'Admin', '0000-00-00', '10:30:00'),
(2, 'User', 'user', '2023-08-01', '16:11:00'),
(0, '', '', '2023-08-01', '16:15:00'),
(12, 'nothing', 'simply sitting', '2023-08-01', '16:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `managesku`
--

CREATE TABLE `managesku` (
  `SlNo` int(100) NOT NULL,
  `SkuName` varchar(100) NOT NULL,
  `SkuDescription` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `AverageQuantity` varchar(100) NOT NULL,
  `ProductName` varchar(100) NOT NULL,
  `SkuDate` date NOT NULL,
  `SkuTime` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managesku`
--

INSERT INTO `managesku` (`SlNo`, `SkuName`, `SkuDescription`, `SkuCode`, `AverageQuantity`, `ProductName`, `SkuDate`, `SkuTime`) VALUES
(1, 'Best Choice Palm 15kg jar', 'Best Choice Palm 15kg jar', '400000356', '1', 'Pouch', '2021-03-15', '2023-08-03 10:13:38.000000');

-- --------------------------------------------------------

--
-- Table structure for table `missioninfeed`
--

CREATE TABLE `missioninfeed` (
  `SlNo` int(100) NOT NULL,
  `Mission` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `StartTime` time(6) NOT NULL,
  `EndDate` date NOT NULL,
  `EndTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `missioninfeed`
--

INSERT INTO `missioninfeed` (`SlNo`, `Mission`, `PalletCode`, `SkuCode`, `Sku`, `Product`, `PoNo`, `BatchNo`, `Quantity`, `Floor`, `Area`, `Rack`, `Position`, `Status`, `StartDate`, `StartTime`, `EndDate`, `EndTime`) VALUES
(1, '40902', '46207', '65347', '', '', '', '', '', '', '', '', '', 'Completed', '0000-00-00', '00:00:00.000000', '0000-00-00', '00:00:00.000000'),
(2, '', '', '', '', '', '', '', '', '', '', '', '', 'Inprogress', '0000-00-00', '00:00:00.000000', '0000-00-00', '00:00:00.000000'),
(3, '437896', '30115799', '90D00054', 'HDC RPO 1LTR POUCH(1*12)', 'POUCH', '6062', 'AH3DCD,MAY23', '98', 'FLOOR 7', 'ASILE3', '3GL25', '3GL25-10', 'COMPLETED', '2023-08-01', '10:19:11.079000', '2023-08-08', '23:20:11.000000'),
(4, '456126', '', '', '', '', '', '', '', '', '', '', '', 'Ready', '0000-00-00', '00:00:00.000000', '0000-00-00', '00:00:00.000000'),
(5, '435625', '', '', '', '', '', '', '', '', '', '', '', 'COMPLETED', '0000-00-00', '00:00:00.000000', '0000-00-00', '00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `missionoutfeed`
--

CREATE TABLE `missionoutfeed` (
  `SlNo` int(100) NOT NULL,
  `Mission` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `SkuDescription` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `TruckNo` varchar(100) NOT NULL,
  `LoadingBay` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `StartTime` time(6) NOT NULL,
  `EndDate` date NOT NULL,
  `EndTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `missionoutfeed`
--

INSERT INTO `missionoutfeed` (`SlNo`, `Mission`, `PalletCode`, `SkuCode`, `SkuDescription`, `BatchNo`, `Position`, `TruckNo`, `LoadingBay`, `Status`, `StartDate`, `StartTime`, `EndDate`, `EndTime`) VALUES
(1, '213', '4321', '6757', 'hahidgowjdh', '876', '44', 'y8duihiu', 'kjdkhw', 'Completed', '2023-08-01', '00:00:00.000000', '2023-08-03', '00:00:00.000000'),
(2, 'hww', '76789', '76754', 'hgjhcsk', '776', '87', 'bj77wh322', 'jk', 'COMPLETED', '2023-08-02', '00:00:00.000000', '2023-08-05', '00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `outfeedlive`
--

CREATE TABLE `outfeedlive` (
  `SlNo` int(100) NOT NULL,
  `Mission` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `SkuDescription` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `TruckNo` varchar(100) NOT NULL,
  `LoadingBay` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `StartTime` time(6) NOT NULL,
  `EndDate` date NOT NULL,
  `EndTme` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partialpalletinfeed`
--

CREATE TABLE `partialpalletinfeed` (
  `SlNo` int(100) NOT NULL,
  `Mission` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `Batch No` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `StartTime` time(4) NOT NULL,
  `EndDate` date NOT NULL,
  `EndTime` time(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skustock`
--

CREATE TABLE `skustock` (
  `SlNo` int(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `SkuName` varchar(100) NOT NULL,
  `BatchName` varchar(100) NOT NULL,
  `BatchQuantity` varchar(100) NOT NULL,
  `SkuQuantity` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skustock`
--

INSERT INTO `skustock` (`SlNo`, `SkuCode`, `SkuName`, `BatchName`, `BatchQuantity`, `SkuQuantity`, `Product`) VALUES
(1, 'H&T pet 1L', '', '', '', '2', 'PET'),
(2, 'H&T 2L POUCH', '', '', '', '3', 'POUCH'),
(3, 'H&T 2L TIN', '', '', '', '5', 'TIN'),
(4, 'H$T 9L Tin', '', '', '', '10', 'tin');

-- --------------------------------------------------------

--
-- Table structure for table `skustoragedetails`
--

CREATE TABLE `skustoragedetails` (
  `SlNo` int(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `BatchNo` int(100) NOT NULL,
  `Quantity` int(100) NOT NULL,
  `PoNo` int(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Day` varchar(100) NOT NULL,
  `LoadDate` date NOT NULL,
  `LoadTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skustoragedetails`
--

INSERT INTO `skustoragedetails` (`SlNo`, `PalletCode`, `SkuCode`, `Product`, `Position`, `BatchNo`, `Quantity`, `PoNo`, `Sku`, `Floor`, `Area`, `Rack`, `Day`, `LoadDate`, `LoadTime`) VALUES
(1, '50010580', '420000219', 'Pouch', '2DRm2-1', 123, 102, 123, 'H3C RPO POUCH(1*12)', 'Floor 4', 'Asile-2', '2DRA3', 'MONDAY', '2023-06-05', '14:56:36.081000');

-- --------------------------------------------------------

--
-- Table structure for table `skuwisedispatch`
--

CREATE TABLE `skuwisedispatch` (
  `SlNo` int(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `SkuDescription` varchar(100) NOT NULL,
  `InfeedCount` varchar(100) NOT NULL,
  `MonthlyInfeed` varchar(100) NOT NULL,
  `Dispatch` varchar(100) NOT NULL,
  `MonthlyDispatch` varchar(100) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stackerdms`
--

CREATE TABLE `stackerdms` (
  `SlNo` int(100) NOT NULL,
  `StackerName` varchar(100) NOT NULL,
  `StackerDescription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stackerdms`
--

INSERT INTO `stackerdms` (`SlNo`, `StackerName`, `StackerDescription`) VALUES
(1, 'STACKER 1', 'STACKER 1');

-- --------------------------------------------------------

--
-- Table structure for table `stockageingreport`
--

CREATE TABLE `stockageingreport` (
  `SlNo` int(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `RackColumn` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `LoadDate` date NOT NULL,
  `LoadTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stockageingreport`
--

INSERT INTO `stockageingreport` (`SlNo`, `PalletCode`, `SkuCode`, `Sku`, `Product`, `PoNo`, `BatchNo`, `Quantity`, `Floor`, `Area`, `RackColumn`, `Rack`, `Position`, `LoadDate`, `LoadTime`) VALUES
(1, 'Pallet1', '4000311', 'Tin', 'Tin', '2463', '34', '90', 'Floor1', 'Asile2', 'Rac2', 'Rac1', '2A', '2023-08-07', '00:00:00.000000'),
(2, 'Pallet2', '4001933', 'Tin', 'Pouch', '1234', '23', '90', 'Floor2', 'Asile3', 'rac1', 'Ra1', '21', '2023-08-08', '00:00:00.000000'),
(2, 'Pallet2', '4001933', 'Tin', 'Pouch', '1234', '23', '90', 'Floor2', 'Asile3', 'rac1', 'Ra1', '21', '2023-08-08', '09:30:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `stockdispatch`
--

CREATE TABLE `stockdispatch` (
  `SlNo` int(100) NOT NULL,
  `PositionRow` varchar(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `RackColumn` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `LoadDate` date NOT NULL,
  `LoadTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stockdispatch`
--

INSERT INTO `stockdispatch` (`SlNo`, `PositionRow`, `PalletCode`, `SkuCode`, `Sku`, `Product`, `PoNo`, `BatchNo`, `Quantity`, `Floor`, `Area`, `RackColumn`, `Rack`, `Position`, `LoadDate`, `LoadTime`) VALUES
(1, '1', '30316236', '42003010', 'HBC RPO 1LTR POUCH(1*12)', 'Pouch', '6202', 'A2108C0', '102', 'Floor7', 'Asile 3', '43', 'RAC12', '3GL413', '2023-06-20', '11:13:20.183000'),
(2, '2', '30314321', '429932011', 'HBC RPO 1LTR TIN(2*19)', 'Tin', '4729', 'A2108C3', '123', 'Floor7', 'Asile2', '23', 'RAC34', '2SL342', '2023-07-03', '03:29:20.395000'),
(3, '3', '39282129', '32129856', 'HBC RPO 5LTR JAR (2*10)', 'Jar', '3902', 'B6208V0', '453', 'Floor2', 'Asile1', '32', 'RAC12', '3BH3262', '2023-08-06', '11:42:32.864000');

-- --------------------------------------------------------

--
-- Table structure for table `stockreport`
--

CREATE TABLE `stockreport` (
  `SlNo` int(100) NOT NULL,
  `PalletCode` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `Sku` varchar(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `PoNo` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `Quantity` varchar(100) NOT NULL,
  `Floor` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `RackColumn` varchar(100) NOT NULL,
  `Rack` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `LoadDate` date NOT NULL,
  `LoadTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_addprod`
--

CREATE TABLE `tbl_addprod` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `skuName` varchar(255) DEFAULT NULL,
  `skuCode` varchar(255) DEFAULT NULL,
  `batchNumber` varchar(255) DEFAULT NULL,
  `productionOrderNo` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `palletCode` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `loadDate` date DEFAULT NULL,
  `cardIndex` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_addprod`
--

INSERT INTO `tbl_addprod` (`id`, `quantity`, `skuName`, `skuCode`, `batchNumber`, `productionOrderNo`, `productName`, `palletCode`, `status`, `loadDate`, `cardIndex`) VALUES
(1, 12, 'HDC 2LTR Pouch ', '123', '32', '15231', 'Pouch', '1234', 'InProgress', '2023-07-05', NULL),
(3, 50, 'ABC', '1532', '121', '35612', 'Jar', '4532', 'Ready', '2023-07-11', NULL),
(4, 12, 'gfhh', '5366', '32', '4553', 'Jar', '578', 'Completed', '2023-07-08', NULL),
(5, 14, 'xyz', '123', '25', '12321', 'Tin', '4312', 'Completed', '2023-07-05', NULL),
(6, 90, 'xyz', '1123', '325', '4582', 'Jar', '5379', 'Completed', '2023-07-30', '2BL2'),
(7, 55, 'PQR', '1131', '15', '12313', 'Tin', '3213', 'Completed', '2023-07-29', '2BL2'),
(8, 35, 'jkl', '789', '70', '5612', 'Bottle', '34512', 'Completed', '2023-07-27', '2BL2'),
(9, 1, 'aaa', '121', '15', '51981', 'Tin', '2134', 'Completed', '2023-07-29', '2BL2'),
(10, 38, 'bbb', '457', '658', '789', 'Pouch', '369', 'Completed', '2023-07-28', '2BL2'),
(11, 1, 'a', '1421', '3', '4325', 'Tin', '114', 'Completed', '2023-07-30', '2BL2'),
(13, 3, 'qqq', '43', '167', '4312', 'Bottle', '234', 'Completed', '2023-07-29', '2BL5'),
(14, 100, 'sri', '324', '30', '22134', 'Jar', '1298', 'Completed', '2023-07-30', '2BL4'),
(15, 40, 'efg', '443', '43', '4321', 'Jar', '5432', 'Completed', '2023-07-28', '2BL2'),
(16, 22, 'mlo', '453', '43', '213', 'Pouch', '4321', 'Completed', '2023-07-30', '2BL9'),
(17, 12, 'aqw', '431', '13', '321', 'Jar', '14', 'Completed', '2023-08-01', '2BL3'),
(18, 15, 'uvw', '45', '33', '542', 'Jar', '21', 'Completed', '2023-07-31', '2BL3'),
(19, 34, 'efg', '33', '15', '54', 'Bottle', '22', 'Completed', '2023-08-02', '2BL52'),
(25, 49, 'tfg', '987', '10', '435', 'Tin', '43', 'Completed', '2023-07-31', '2BL49'),
(26, 90, 'pom', '8907', '32', '654', 'Bottle', '12', 'Completed', '2023-07-31', '2BL49'),
(27, 99, 'hh', '56', '45', '887', 'Pouch', '78', 'Completed', '2023-08-01', '2BL52'),
(28, 44, 'ret', '895', '998', '3303', 'Pouch', '858', 'Completed', '2023-08-03', '2BL1'),
(29, 21, 'uyt', '885', '343', '709', 'Jar', '564', 'Completed', '2023-08-01', '2BL1'),
(30, 1, 'abc', '765', '12', '3421', 'Pouch', '123', 'Completed', '2023-08-09', '2BL56'),
(31, 12, 'hhj', '88', '342', '7654', 'Jar', '564', 'Completed', '2023-08-07', '2BL56'),
(32, 2314, 'njhh', '897', '76665', '88', 'Tin', '887', 'Completed', '2023-08-02', '2BL155');

-- --------------------------------------------------------

--
-- Table structure for table `truckloadingtat`
--

CREATE TABLE `truckloadingtat` (
  `LessThan2Hrs` varchar(100) NOT NULL,
  `LessThan4Hrs` varchar(100) NOT NULL,
  `LessThan5Hrs` varchar(100) NOT NULL,
  `LessThan6Hrs` varchar(100) NOT NULL,
  `MoreThan2Hrs` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `truckloadingtatdetails`
--

CREATE TABLE `truckloadingtatdetails` (
  `SlNo` int(100) NOT NULL,
  `TruckNo` varchar(100) NOT NULL,
  `LoadingStartTime` time(6) NOT NULL,
  `LoadingEndTime` time(6) NOT NULL,
  `LoadTime` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `truckwiseloadingreport`
--

CREATE TABLE `truckwiseloadingreport` (
  `SlNo` int(100) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `SkuCode` varchar(100) NOT NULL,
  `ZotbNumber` varchar(100) NOT NULL,
  `BatchNo` varchar(100) NOT NULL,
  `MaterialQuantity` varchar(100) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sessionToken` char(64) DEFAULT NULL,
  `sessionExpiration` datetime DEFAULT NULL,
  `isLoggedIn` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `sessionToken`, `sessionExpiration`, `isLoggedIn`) VALUES
(1, 'kavana', 'kavana@gmail.com', 'Kavana14', NULL, NULL, NULL),
(2, 'admin', 'admin@gmail.com', 'Admin123', '$2b$10$OGvfTuqKSMRjSz2/7TfQS.HzfStYgbOu3eBZqUKki9s51x3Jt5mm6', '2023-08-16 10:42:30', 1),
(4, 'abc', 'abc@gmail.com', 'Abc123', '$2b$10$Ev2Ob8lTiyCsfEASgeHFCeL/ig9KqW26pPITZ85xt2iRlKV4x/tRO', '2023-07-11 11:38:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usersdata`
--

CREATE TABLE `usersdata` (
  `SlNo` int(100) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `EmailId` varchar(100) NOT NULL,
  `ContactNo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersdata`
--

INSERT INTO `usersdata` (`SlNo`, `UserName`, `Name`, `Gender`, `EmailId`, `ContactNo`) VALUES
(2, 'kavana@nie', 'kavana', 'Female', 'kavana123@gmail.com', '9189203800'),
(1, 'shubha123', 'shubha', 'Female', 'shubah@gmail.com', '9108892704'),
(3, 'Gourish@karvar', 'gourish', 'Male', 'gourish@gmail.com', '9123456709');

-- --------------------------------------------------------

--
-- Table structure for table `zotbdetails`
--

CREATE TABLE `zotbdetails` (
  `SlNo` int(100) NOT NULL,
  `ZotbNumber` varchar(100) NOT NULL,
  `TruckNumber` varchar(100) NOT NULL,
  `ZotbDispatchStartDate` date NOT NULL,
  `ZotbDispatchStartTime` time(6) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `floor`
--
ALTER TABLE `floor`
  ADD PRIMARY KEY (`cardIndex`);

--
-- Indexes for table `manageproduct`
--
ALTER TABLE `manageproduct`
  ADD PRIMARY KEY (`SlNo`);

--
-- Indexes for table `tbl_addprod`
--
ALTER TABLE `tbl_addprod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tbl_addprod_cardIndex` (`cardIndex`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_addprod`
--
ALTER TABLE `tbl_addprod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_addprod`
--
ALTER TABLE `tbl_addprod`
  ADD CONSTRAINT `fk_tbl_addprod_cardIndex` FOREIGN KEY (`cardIndex`) REFERENCES `floor` (`cardIndex`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
