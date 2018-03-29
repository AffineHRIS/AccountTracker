-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: accountstracker
-- ------------------------------------------------------
-- Server version	5.5.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aa_user`
--

DROP TABLE IF EXISTS `aa_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aa_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `password` text,
  `role` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` text,
  `updated_at` text,
  `last_password_changed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aa_user`
--

LOCK TABLES `aa_user` WRITE;
/*!40000 ALTER TABLE `aa_user` DISABLE KEYS */;
INSERT INTO `aa_user` VALUES (1,'developer','$2a$10$OkIPftYYfULDLrZZDv4T0OznP2e75mwTiksOWx7vlHCjHCb3.8996',NULL,NULL,NULL,NULL,'2018-03-29 16:08:39');
/*!40000 ALTER TABLE `aa_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `Account_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Account_Name` varchar(50) DEFAULT NULL,
  `Account_Manager` varchar(50) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Country` varchar(500) DEFAULT NULL,
  `Phone_Number` varchar(20) DEFAULT NULL,
  `Email_Id` varchar(50) DEFAULT NULL,
  `Contact_Person` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Account_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Microsoft','rahul','Whitefield','Bangalore','India','9999999999','sourav@microsoft.com','Sourav'),(2,'lenovo','yogi',NULL,NULL,NULL,'5555555555',NULL,NULL),(3,'Expedia','Ashish','Ecity','Bangalore','India','8888888888','vivek@microsoft.com','Vivek'),(4,'Cisco','Rajesh','marathalli','Bangalore','India','9999999966','sourav@cisco.com','Sourav'),(5,'Puma','rajesh','Gachibowli','Hyderabad','India','78787878787','yogesh@puma.com','Yogesh'),(6,'Mi','Kuldeep','Pune','Pune','India','1212121212','rakesh@mi.com','Rakesh'),(7,'lenovo','chakri',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_details`
--

DROP TABLE IF EXISTS `employee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_details` (
  `Employee_Id` varchar(15) NOT NULL,
  `Employee_Name` varchar(100) NOT NULL,
  `Email_Id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Employee_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_details`
--

LOCK TABLES `employee_details` WRITE;
/*!40000 ALTER TABLE `employee_details` DISABLE KEYS */;
INSERT INTO `employee_details` VALUES ('AAIN0002','Vineet Kumar','vineet.kumar@affineanalytics.com'),('AAIN0003','Manas Agarwal','manas.agrawal@affineanalytics.com'),('AAIN0026','Ashish Maheshwari','ashish.maheshwari@affineanalytics.com'),('AAIN0027','Altaf Uddin Ahmed','altaf.u@affineanalytics.com'),('AAIN0064','G. Sowjanya','g.sowjanya@affineanalytics.com'),('AAIN0068','Sushant Kashyap','sushant.kashyap@affineanalytics.com'),('AAIN0081','Shweta Vandal','shweta.vandal@affineanalytics.com'),('AAIN0088','Mahesh Chandra Bhat','mahesh.bhat@affineanalytics.com'),('AAIN0092','Manasa B K','manasa.raghu@affineanalytics.com'),('AAIN0096','Amrendra Kumar','amrendra.kumar@affineanalytics.com'),('AAIN0102','Kanchan Bhalotia','kanchan.bhalotia@affineanalytics.com'),('AAIN0111','Subhransu Mohan Sathpathy','subhransu.sathpathy@affineanalytics.com'),('AAIN0114','Akshay Singh Narwaria','akshay.narwaria@affineanalytics.com'),('AAIN0122','Sahil Gupta','sahil.gupta@affineanalytics.com'),('AAIN0125','Priyankar Sengupta','priyankar.sengupta@affineanalytics.com'),('AAIN0136','Yathish Narasimhan','yathish.narasimhan@affineanalytics.com'),('AAIN0140','Shaalini T','shaalini.thanapalan@affineanalytics.com'),('AAIN0147','Suvajit Sen','suvajit.sen@affineanalytics.com'),('AAIN0148','Ananya Chandraker','ananya.chandraker@affineanalytics.com'),('AAIN0156','Bhramar Chandrakar','bhramar.chandrakar@affineanalytics.com'),('AAIN0162','Saivisveswar Karnam','saivisveswar.karnam@affineanalytics.com'),('AAIN0163','Sourav Mazumdar','sourav.mazumdar@affineanalytics.com'),('AAIN0166','Saloni Singh','saloni.singh@affineanalytics.com'),('AAIN0167','Mallikarjun D','mallikarjun1772@gmail.com'),('AAIN0174','Rohan Goyal','rohan.goyal@affineanalytics.com'),('AAIN0180','Nikita Kodnani','nikita.kodnani@affineanalytics.com'),('AAIN0181','Abhishek Sinha','sinha.abhishek@affineanalytics.com'),('AAIN0182','Vaishnavi Byreddy','vaishnavi.byreddy@affineanalytics.com'),('AAIN0188','Mohammad Jilani','mohammad.jilani@affineanalytics.com'),('AAIN0189','Vaibhav Temani','vaibhav.temani@affineanalytics.com'),('AAIN0190','Saidev Bhaskar','saidev.bhaskar@affineanalytics.com'),('AAIN0204','Shuddhashil Mullick','shuddhashil.mullick@affineanalytics.com'),('AAIN0206','Chahat Kalia','chahat.kalia@affineanalytics.com'),('AAIN0209','Sachin Thomas','sachin.thomas@affineanalytics.com'),('AAIN0212','Abhinav Gupta','abhinav.gupta@affineanalytics.com'),('AAIN0214','Nivedita Kumari','nivedita.kumari@affineanalytics.com'),('AAIN0216','Uday Kiran','uday.kiran@affineanalytics.com'),('AAIN0217','Manjushree Hegde','manjushree.hegde@affineanalytics.com'),('AAIN0220','Sayantan Chakraborty','sayantan.chakraborty@affineanalytics.com'),('AAIN0224','Apoorva Kumar G','apoorva.kumar@affineanalytics.com'),('AAIN0226','Abhishek Kumar','abhishek.kumar@affineanalytics.com'),('AAIN0231','Varsha Singhania','varsha.singhania@affineanalytics.com'),('AAIN0236','Abhilash Mishra','abhilash.mishra@affineanalytics.com'),('AAIN0239','Aysha Muhammad Machingara','aysha.muhammad@affineanalytics.com'),('AAIN0241','Arpita Das','arpita.das@affineanalytics.com'),('AAIN0242','Vivek Sharma','vivek.sharma@affineanalytics.com'),('AAIN0245','Prerna','prerna.verma@affineanalytics.com'),('AAIN0247','Hamza Saleem','hamza.saleem@affineanalytics.com'),('AAIN0254','Ankita Singh','ankita.singh@affineanalytics.com'),('AAIN0256','Ayush Agarwal','ayush.agarwal1@affineanalytics.com'),('AAIN0257','Badrinarayanan R ','rajasekaran.badrinarayanan@affineanalytics.com'),('AAIN0262','Vishnu Kumar Reddy M.','vishnu.reddy@affineanalytics.com'),('AAIN0263','Apurv Mittal','apurv.mittal@affineanalytics.com'),('AAIN0264','Sahana Ramanand','sahana.ramanand@affineanalytics.com'),('AAIN0266','Swaminathan K S ','swaminathan.ks@affineanalytics.com'),('AAIN0267','Amber Awasthi','ambar.awasthi@affineanalytics.com'),('AAIN0269','Sharath Babu S N','sharath.babu@affineanalytics.com'),('AAIN0270','Samanth Kumar','samanth.kumar@affineanalytics.com'),('AAIN0271','Yogesh S','yogesh.shanmukhappa@affineanalytics.com'),('AAIN0282','Gagandeep Singh','gagandeep.singh@affineanalytics.com'),('AAIN0283','Sukrit Kurle','sukrit.kurle@affineanalytics.com'),('AAIN0284','P Selvakumar','selvakumar.periyasamy@affineanalytics.com'),('AAIN0289','Ijis Cheru C','ijis.cheru@affineanalytics.com'),('AAIN0292','Nikhil Chandran','nikhil.chandran@microsoftaffine.com'),('AAIN0293','Chetan Mehta','chetan.mehta@affineanalytics.com'),('AAIN0296','Rahul Rai','rahul.rai@affineanalytics.com'),('AAIN0298','Shailesh Kumar Singh','shailesh.singh@affineanalytics.com'),('AAIN0299','Kshitij Bansal','kshitij.bansal@affineanalytics.com'),('AAIN0301','Shravan Kumar Kantha','Shravan.kantha@affineanalytics.com'),('AAIN0302','Pammi Venkata Valli Sudha','valli.sudha@affineanalytics.com'),('AAIN0312','Tarunay Roy','tarunay.roy@affineanalytics.com'),('AAIN0318','Somya Sutar','somya.sutar@affineanalytics.com'),('AAIN0321','Murali R','murali.241985@gmail.com'),('AAIN0325','Anuja Kokrady','anuja.kokrady@affineanalytics.com'),('AAIN0326','Iranna Gadad','iranna.gadad@affineanalytics.com'),('AAIN0327','Lakshya Bhargava','lakshya.bhargava@affineanalytics.com'),('AAIN0329','Shivam Chopra','shivam.chopra@affineanalytics.com'),('AAIN0331','Vikash Chiriki','vikash.chiriki@affineanalytics.com'),('AAIN0332','Shivangi Shukla','shivangi.shukla@affineanalytics.com'),('AAIN0334','Gudla Mounika','gudla.mounika@affineanalytics.com'),('AAIN0338','Shraiys Joshi','shraiyas.joshi@affineanalytics.com'),('AAIN0343','Raksha Khanna','raksha.khanna@affineanalytics.com'),('AAIN0344','Torsha Chowdhury','torsha.chowdhury@affineanalytics.com'),('AAIN0349','Supradeep Das','supradeep.das@affineanalytics.com'),('AAIN0350','Chavi Bhaskar','chavi.bhaskar@affineanalytics.com'),('AAIN0351','Vishwash Kumar','vishwash.kumar@affineanalytics.com'),('AAIN0353','Vivek Kamalakshan','vivek.kamalakshan@affineanalytics.com'),('AAIN0354','Harshit Gupta','harshit.gupta@affineanalytics.com'),('AAIN0355','Anshul Chaurasia','anshul.chaurasia@affineanalytics.com'),('AAIN0356','Chakradhar Venkata Satya Dittakavi','chakradhar.dittakavi@affineanalytics.com'),('AAIN0359','Harini Akurathi','harini.akurathi@affineanalytics.com'),('AAIN0363','Shishir Sheshadri','shishir.sheshadri@affineanalytics.com'),('AAIN0375','Sayed Shahrukh Ashfaque','shahrukh.sayed@affineanalytics.com'),('AAIN0379','Sarthak Jagetiya','sarthak.jagetiya@affineanalytics.com'),('AAIN0384','Karthik Devaraj','karthik.devaraj@affineanalytics.com'),('AAIN0385','Sneh Kumar','sneh.kumar@affineanalytics.com'),('AAIN0391','Pratik Raj Singh','pratik.raj@affineanalytics.com'),('AAIN0392','Bharath Jaychandran','bharath.jayachandran@affineanalytics.com'),('AAIN0393','Mohammed Fazil','mohammed.fazil@affineanalytics.com'),('AAIN0394','Suraj Kumar Mishra','suraj.mishra@affineanalytics.com'),('AAIN0396','Samarth Bali','samarth.bali@affineanalytics.com'),('AAIN0398','Kotresh Rakesh Roshan','rakesh.roshan@affineanalytics.com'),('AAIN0400','Alexander GK','alexander.gk@affineanalytics.com'),('AAIN0401','Modugula Veerareddy','veera.reddy@affineanalytics.com'),('AAIN0410','Pratik Agarwal','pratik.a@affineanalytics.com'),('AAIN0411','Sunit Kumar Sahu','sunit.sahu@affineanalytics.com'),('AAIN0413','Saurabh Sadani','saurabh.sadani@affineanalytics.com'),('AAIN0414','R. Keshavalakshmi','keshavalakshmi.r@affineanalytics.com'),('AAIN0421','Anshuman Neog','anshuman.neog@affineanalytics.com'),('AAIN0422','Dipayan Dey Sarkar','dipayan.sarkar@affineanalytics.com'),('AAIN0425','Chiranjeevi Panchakarla','chiranjeevi.panchakarla@affineanalytics.com'),('AAIN0428','Devesh Sharma','devesh.sharma@affineanalytics.com'),('AAIN0434','Dhvani Kothari','dhvani.kothari@affineanalytics.com'),('AAIN0435','G Gowrav','gowrav.g@affineanalytics.com'),('AAIN0443','Karan Vashisht','karan.vashisht@affineanalytics.com'),('AAIN0444','Mayank Chawla','mayank.chawla@affineanalytics.com'),('AAIN0445','Piyusha Tanwani','piyusha.tanwani@affineanalytics.com'),('AAIN0448','Gopinath Rajasekar','gopinath.rajasekar@affineanalytics.com'),('AAIN0449','Subhashis Sahu','subhashis.sahu@affineanalytics.com'),('AAIN0450','Taniya Ghosh','taniya.ghosh@affineanalytics.com'),('AAIN0455','Diana D’souza','diana.dsouza@affineanalytics.com'),('AAIN0458','Tanvi Mandloi','tanvi.mandloi@affineanalytics.com'),('AAIN0461','Kuleesha ','Kuleesha@affineanalytics.com'),('AAIN0463','Ravikanti Sai Nikhil','ravikanti.nikhil@affineanalytics.com'),('AAIN0465','Gudipati Madan','madan.gudipati@affineanalytics.com'),('AAIN0466','Chikkanna K','chikkanna.k@affineanalytics.com'),('AAIN0467','Prabhanjan Sahu','prabhanjan.sahu@affineanalytics.com'),('AAIN0470','Ashutosh Panda','ashutosh.panda@affineanalytics.com'),('AAIN0471','Dristi Chatterjee','dristi.chatterjee@affineanalytics.com'),('AAIN0472','Anendra Gupta','anendra.gupta@affineanalytics.com'),('AAIN0473','Shifu Jain','shifu.jain@affineanalytics.com'),('AAIN0474','Aruna M','aruna.m@affineanalytics.com'),('AAIN0475','Priyanka Kulshrestha','priyanka.kulshrestha@affineanalytics.com'),('AAIN0476','Ankit Sharma','ankit.sharma@affineanalytics.com'),('AAIN0477','Nilesh Agarwalla','nilesh.agarwalla@affineanalytics.com'),('AAIN0479','Vaibhav Bajaj','vaibhav.bajaj@affineanalytics.com'),('AAIN0480','Gautham V Bhat','gautham.bhat@affineanalytics.com'),('AAIN0481','Divya Batra','divya.batra@affineanalytics.com'),('AAIN0482','Pulkit Khandelwal','pulkit.khandelwal@affineanalytics.com'),('AAIN0483','Nancy Jain','nancy.jain@affineanalytics.com'),('AAIN0484','Eshaan Kulshreshtha','eshaan.kulshreshtha@affineanalytics.com'),('AAIN0485','Ankit Kumar','ankit.kumar@affineanalytics.com'),('AAIN0487','John Jacob Attasseril','john.attasseril@affineanalytics.com'),('AAIN0488','Parth Gera','parth.gera@affineanalytics.com'),('AAIN0490','Kurapati Sowmya','kurapati.sowmya@affineanalytics.com'),('AAIN0491','Deepti Chawla','deepti.chawla@affineanalytics.com'),('AAIN0492','Suvankar Roy','suvankar.roy@affineanalytics.com'),('AAIN0493','Kuldeep Shukla','kuldeep.shukla@affineanalytics.com'),('AAIN0494','Devi Prasad Khatua','devi.prasad@affineanalytics.com'),('AAIN0495','Kush Kothari','kush.kothari@affineanalytics.com'),('AAIN0496','Prasoon Puri','prasoon.puri@affineanalytics.com'),('AAIN0497','Ansuman Chand','Ansuman.Chand@affineanalytics.com'),('AAIN0498','Arunav Saikia ','arunav.saikia@affineanalytics.com'),('AAIN0499','Mandovi Borthakur','mandovi.borthakur@affineanalytics.com'),('AAIN0500','Nimish Agarwal','nimish.agarwal@affineanalytics.com'),('AAIN0501','Shibayan Saha','shibayan.saha@affineanalytics.com'),('AAIN0502','Guncha Garg','guncha.garg@affineanalytics.com'),('AAIN0504','Ankur Garg','ankur.garg@affineanalytics.com'),('AAIN0505','R Dilip Reddy','dilip.reddy@affineanalytics.com'),('AAIN0506','M. Phanidhar','phanidhar.m@affineanalytics.com'),('AAIN0507','Hitesh Kumar Kanwar','hitesh.kumar@affineanalytics.com'),('AAIN0508','Mounika Gajavilli ','mounika.gajavilli@affineanalytics.com'),('AAIN0509','Rayudu Pujitha ','rayudu.pujitha@affineanalytics.com'),('AAIN0510','Gaurav Sharma','gaurav.sharma@affineanalytics.com'),('AAIN0511','Akhtar Kamran','akhtar.kamran@affineanalytics.com'),('AAIN0512','Tapobrata Behera','Tapobrata.Behera@affineanalytics.com'),('AAIN0513','Racharla Karthikeya','karthikeya.racharla@affineanalytics.com'),('AAIN0516','Nitin Khandelwal','nitin.khandelwal@affineanalytics.com'),('AAIN0517','Soumanta Das','soumanta.das@affineanalytics.com'),('AAIN0518','Mohd Azad','mohd.azad@affineanalytics.com'),('AAIN0519','Shanoob PP','shanoob.pp@affineanalytics.com'),('AAIN0520','Ankit Khandelwal','ankit.khandelwal@affineanalytics.com'),('AAIN0521','Chitvan Gupta','chitvan.gupta@affineanalytics.com'),('AAIN0523','Mohit Menon','mohit.menon@affineanalytics.com'),('AAIN0524','Sourav Kumar Mishra','sourav.mishra@affineanalytics.com'),('AAIN0525','Tuhina Basu','tuhina.basu@affineanalytics.com'),('AAIN0526','Sreeparna Chatterjee','sreeparna.chatterjee@affineanalytics.com'),('AAIN0527','Poulami Roy','poulami.roy@affineanalytics.com'),('AAIN0528','Tiasha Dhar','tiasha.dhar@affineanalytics.com'),('AAIN0529','Sreeja Mondal','sreeja.mondal@affineanalytics.com'),('AAIN0531','Ritesh Kumar','ritesh.kumar@affineanalytics.com'),('AAIN0532','Ramanan Balan','ramanan.balan@affineanalytics.com'),('AAIN0533','Harsh Vardhan','harsh.vardhan@affineanalytics.com'),('AAIN0534','Vishnu Chaithanya','vishnu.chaithanya@affineanalytics.com'),('AAIN0535','Shuchi Sureka','shuchi.sureka@affineanalytics.com'),('AAIN0536','Rajesh Narayan','rajesh.narayan@affineanalytics.com'),('AAIN0537','Nidhi Agarwal','nidhi.agrawal@affineanalytics.com'),('AAIN0538','Gururajan Srinivasan','gururajan.srinivasan@affineanalytics.com'),('AAIN0540','Pavan Patil','pavan.patil@affineanalytics.com'),('AAIN0541','Archit Agrawal','archit.agrawal@affineanalytics.com'),('AAIN0542','Siva Teja','siva.teja@affineanalytics.com'),('AAIN0543','Prayashi Bohra','prayashi.bohra@affineanalytics.com'),('AAIN0544','Deepshikha Mahapatra','deepshikha.mahapatra@affineanalytics.com'),('AAIN0545','Rahul AP','rahul.ap@affineanalytics.com'),('AAIN0546','Abhishek Singha','abhishek.singha@affineanalytics.com'),('AAIN0547','Sandeep Sanyal','sandeep.sanyal@affineanalytics.com'),('AAIN0548','Utkarsh Chaturvedi','utkarsh.chaturvedi@affineanalytics.com'),('AAIN0549','Akshay Singhania','akshay.singhania@affineanalytics.com'),('AAIN0550','Shubhi Saini','shubhi.saini@affineanalytics.com'),('AAIN0552','Hindol Ganguly','hindol.ganguly@affineanalytics.com'),('AAIN0553','BIBIN MATHEW JOSE','bibin.jose@affineanalytics.com'),('AAIN0567','Monika Singh','monika.singh@affineanalytics.com'),('aain549','AKSHAY SINGHANIA','akshay.singhania@affineanalytics.com'),('AINC0001','Anindya Palit','anindya.palit@affineanalytics.com'),('AINC0013','Priyanka Chauhan','priyanka.chauhan@affineanalytics.com'),('AINC0015','Bedanta Bordoloi','bedanta.bordoloi@affineanalytics.com'),('AINC0026','Vamseekrishna Rayepudi','vamseekrishna.rayepudi@affineanalytics.com'),('AINC0044','Swati Kumari','swati.kumari@affineanalytics.com'),('AINC0045','Kesava Krishna','kesava.krishna@affineanalytics.com'),('AINC0049','Vamshi Vennamaneni','vamshi.vennamaneni@affineanalytics.com'),('AINC0050','Shashank R Boppidi','shashank.boppidi@affineanalytics.com'),('AINC0052','Sujith Kumar Kotagiri','sujith.kotagiri@affineanalytics.com'),('AINC0053','Sai Kirshna Chaitanya Chigili','krishna.chaitanya@affineanalytics.com'),('AINC0055','Madhusudhan Chakravarthi Vengarai Raghunathan','madhusudhan.chakravarthi@affineanalytics.com'),('AINC0057','Kunal Wagh','kunal.wagh@affineanalytics.com'),('AINC0058','Nayan Gupta','nayan.gupta@affineanalytics.com'),('AINC0059','Nisanth Dheram','nisanth.dheram@affineanalytics.com'),('AINC0060','Hemanth Sindhanuru','hemanth.sindhanuru@affineanalytics.com'),('AINC0065','Robab Fayazi','robab.fayazi@affineanalytics.com'),('AINC0069','Abhinav Pathak','abhinav.pathak@affineanalytics.com'),('AINC0072','Udayan Goswami','udayan.goswami@affineanalytics.com'),('AINC0074','Bharath Kalluri','bharath.kalluri@affineanalytics.com'),('AINC0075','Divitha Rajeev Nair','divitha.nair@affineanalytics.com'),('AINC0076','Bhawna Jain','bhawna.jain@affineanalytics.com'),('AINC0078','Abhijit Desai','abhijit.desai@affineanalytics.com'),('AINC0079','Rohan U Sawant','rohan.sawant@affineanalytics.com'),('AINC0080','Ritesh Gandhi','ritesh.gandhi@affineanalytics.com'),('AINC0081','Dhanashree Dhage','dhanashree.dhage@affineanalytics.com'),('AINC0082','Anshul Sachdev','anshul.sachdev@affineanalytics.com'),('AINC0083','Rajarajan Subramaniam','rajarajan.subramanian@affineanalytics.com'),('AINC0084','Sriharsha Surineni','sriharsha.surineni@affineanalytics.com'),('AINC0085','Venkata Prudhvi Raj Indana','prudhvi.raj@affineanalytics.com'),('AINC0086','Kshitij Bansal','kshitij.bansal@affineanalytics.com'),('AINC0087','Love Tyagi','love.tyagi@affineanalytics.com');
/*!40000 ALTER TABLE `employee_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msa`
--

DROP TABLE IF EXISTS `msa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msa` (
  `MSA_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `MSA_Name` varchar(20) NOT NULL,
  `Account_Id` bigint(20) NOT NULL,
  `MSA_Start_Date` datetime DEFAULT NULL,
  `MSA_End_Date` datetime DEFAULT NULL,
  `MSA_Client_Signing_Authority` varchar(50) DEFAULT NULL,
  `MSA_Client_Signing_Authority_Email` varchar(50) DEFAULT NULL,
  `MSA_Client_Signing_Authority_Number` varchar(15) DEFAULT NULL,
  `MSA_Payment_Frequency` varchar(50) DEFAULT NULL,
  `MSA_Payment_Credit_Period` varchar(50) DEFAULT NULL,
  `MSA_Client_Finance_Person` varchar(50) DEFAULT NULL,
  `MSA_Client_Finance_Person_Email` varchar(50) DEFAULT NULL,
  `MSA_Affine_Signing_Authority` varchar(50) DEFAULT NULL,
  `MSA_Affine_Signing_Authority_Email` varchar(50) DEFAULT NULL,
  `MSA_Affine_Signing_Authority_Number` varchar(50) DEFAULT NULL,
  `MSA_Legal_Person_Contact` varchar(50) DEFAULT NULL,
  `MSA_Document` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MSA_Id`),
  UNIQUE KEY `MSA_Id_UNIQUE` (`MSA_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msa`
--

LOCK TABLES `msa` WRITE;
/*!40000 ALTER TABLE `msa` DISABLE KEYS */;
INSERT INTO `msa` VALUES (1,'MSA1',1,'2018-03-27 00:00:00','2018-03-31 00:00:00','Stuart','stuart@microsoft.com','34567890','milestone','20','guru','guru@client.com','Ashish',NULL,NULL,NULL,'Note on testing.docx'),(2,'Exp MSA',3,'2018-03-28 00:00:00','2018-04-27 00:00:00','mark','mark@expedia.com',NULL,NULL,NULL,NULL,NULL,'vivek',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `msa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sow`
--

DROP TABLE IF EXISTS `sow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sow` (
  `SOW_Id` int(11) NOT NULL AUTO_INCREMENT,
  `SOW_Name` varchar(45) NOT NULL,
  `SOW_Number` varchar(45) DEFAULT NULL,
  `MSA_Id` int(11) DEFAULT NULL,
  `SOW_Description` varchar(500) DEFAULT NULL,
  `SOW_Start_Date` datetime DEFAULT NULL,
  `SOW_End_Date` datetime DEFAULT NULL,
  `SOW_Value` varchar(45) DEFAULT NULL,
  `SOW_Monthly_Value` varchar(45) DEFAULT NULL,
  `SOW_No_Of_Persons` varchar(45) DEFAULT NULL,
  `SOW_Onsite_Count` varchar(45) DEFAULT NULL,
  `SOW_Offshore_Count` varchar(45) DEFAULT NULL,
  `SOW_Onsite_Rate` varchar(45) DEFAULT NULL,
  `SOW_Max_Onsite_Hours_Per_Day` varchar(45) DEFAULT NULL,
  `SOW_Offshore_Rate` varchar(45) DEFAULT NULL,
  `SOW_Invoice_Frequency` varchar(45) DEFAULT NULL,
  `SOW_Invoice_Credit_Period` varchar(45) DEFAULT NULL,
  `SOW_Travel` varchar(45) DEFAULT NULL,
  `SOW_Document` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SOW_Id`),
  UNIQUE KEY `SOW_Id_UNIQUE` (`SOW_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sow`
--

LOCK TABLES `sow` WRITE;
/*!40000 ALTER TABLE `sow` DISABLE KEYS */;
INSERT INTO `sow` VALUES (1,'SOW1','1234',1,'test','2018-03-27 00:00:00','2018-03-31 00:00:00','10000','10','22','12','10','1000','8','20','monthly','10','120','Affine _ IT Proof submission forms FY 2017-18.xlsx');
/*!40000 ALTER TABLE `sow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-29 17:56:02
