-- Remove 'use info_db;' — DigitalOcean only allows operations on your existing DB (e.g., defaultdb)

--
-- Table structure for table `departments`
--

USE info_db;

CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `abbreviation` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `registration`
--
CREATE TABLE `registration` (
  `id` int NOT NULL AUTO_INCREMENT,          -- ✅ Added primary key
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('admin','student','employee') NOT NULL,
  PRIMARY KEY (`id`)                         -- ✅ Enforced by DO
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `role` enum('admin','student','employee') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data
--
INSERT INTO `registration` (`id`, `username`, `password`, `fullname`, `email`, `role`) VALUES
(1, 'admin', 'admin', 'Administrator', '', 'admin');

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `email`, `google_id`, `role`) VALUES
(3, NULL, NULL, 'INAH LAINE PACATANG', 'pacatang.inahlaine@cec.edu.ph', '106154313349889795555', 'admin'),
(4, 'admin', 'admin', 'Administrator', '', '', 'admin'),
(5, NULL, NULL, 'Jereme Flores', 'jeremeflores5@gmail.com', '107011917031098946269', 'admin'),
(6, NULL, NULL, 'JEREME FLORES', 'flores.jereme@cec.edu.ph', '104716100393957361480', 'admin');

-- AUTO_INCREMENT handled automatically by DO