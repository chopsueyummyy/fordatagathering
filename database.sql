-- ============================================================================
-- CourseAlign Database Schema & Initial Data Seed
-- Database Name: coursealigngd_db
-- Target: MySQL / MariaDB via phpMyAdmin (XAMPP)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `coursealigngd_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `coursealigngd_db`;

-- ----------------------------------------------------------------------------
-- 1. Administrative Users Table (Researcher Access)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin account (Username: admin | Password: admin123)
INSERT INTO `admins` (`username`, `password_hash`) VALUES
('admin', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe1g.n.Jv0HvhL4N/O9c41EaQnK5bW4K2')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- ----------------------------------------------------------------------------
-- 2. RIASEC Questionnaire Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `questions` (
    `id` INT PRIMARY KEY,
    `category` VARCHAR(10) NOT NULL,
    `cat_name` VARCHAR(50) NOT NULL,
    `question_text` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed the 42 Official RIASEC Questions
INSERT INTO `questions` (`id`, `category`, `cat_name`, `question_text`) VALUES
(1, 'R', 'Realistic (Doer)', 'I like to work on cars'),
(2, 'I', 'Investigative (Thinker)', 'I like to do puzzles'),
(3, 'A', 'Artistic (Creator)', 'I am good at working independently'),
(4, 'S', 'Social (Helper)', 'I like to work in teams'),
(5, 'E', 'Enterprising (Persuader)', 'I am an ambitious person, I set goals for myself'),
(6, 'C', 'Conventional (Organizer)', 'I like to organize things, (files, desks/offices)'),
(7, 'R', 'Realistic (Doer)', 'I like to build things'),
(8, 'A', 'Artistic (Creator)', 'I like to read about art and music'),
(9, 'C', 'Conventional (Organizer)', 'I like to have clear instructions to follow'),
(10, 'E', 'Enterprising (Persuader)', 'I like to try to influence or persuade people'),
(11, 'I', 'Investigative (Thinker)', 'I like to do experiments'),
(12, 'S', 'Social (Helper)', 'I like to teach or train people'),
(13, 'S', 'Social (Helper)', 'I like trying to help people solve their problems'),
(14, 'R', 'Realistic (Doer)', 'I like to take care of animals'),
(15, 'C', 'Conventional (Organizer)', 'I wouldn\'t mind working 8 hours per day in an office'),
(16, 'E', 'Enterprising (Persuader)', 'I like selling things'),
(17, 'A', 'Artistic (Creator)', 'I enjoy creative writing'),
(18, 'I', 'Investigative (Thinker)', 'I enjoy science'),
(19, 'E', 'Enterprising (Persuader)', 'I am quick to take on new responsibilities'),
(20, 'S', 'Social (Helper)', 'I am interested in healing people'),
(21, 'I', 'Investigative (Thinker)', 'I enjoy trying to figure out how things work'),
(22, 'R', 'Realistic (Doer)', 'I like putting things together or assembling things'),
(23, 'A', 'Artistic (Creator)', 'I am a creative person'),
(24, 'C', 'Conventional (Organizer)', 'I pay attention to details'),
(25, 'C', 'Conventional (Organizer)', 'I like to do filing or typing'),
(26, 'I', 'Investigative (Thinker)', 'I like to analyze things (problems/situations)'),
(27, 'A', 'Artistic (Creator)', 'I like to play instruments or sing'),
(28, 'S', 'Social (Helper)', 'I enjoy learning about other cultures'),
(29, 'E', 'Enterprising (Persuader)', 'I would like to start my own business'),
(30, 'R', 'Realistic (Doer)', 'I like to cook'),
(31, 'A', 'Artistic (Creator)', 'I like acting in plays'),
(32, 'R', 'Realistic (Doer)', 'I am a practical person'),
(33, 'I', 'Investigative (Thinker)', 'I like working with numbers or charts'),
(34, 'S', 'Social (Helper)', 'I like to get into discussions about issues'),
(35, 'C', 'Conventional (Organizer)', 'I am good at keeping records of my work'),
(36, 'E', 'Enterprising (Persuader)', 'I like to lead'),
(37, 'R', 'Realistic (Doer)', 'I like working outdoors'),
(38, 'C', 'Conventional (Organizer)', 'I would like to work in an office'),
(39, 'I', 'Investigative (Thinker)', 'I\'m good at math'),
(40, 'S', 'Social (Helper)', 'I like helping people'),
(41, 'A', 'Artistic (Creator)', 'I like to draw'),
(42, 'E', 'Enterprising (Persuader)', 'I like to give speeches'),
-- Seed the 10 Official Rosenberg Self-Esteem Scale (RSE) Questions
(101, 'RSE_P', 'Rosenberg Self-Esteem', 'On the whole, I am satisfied with myself.'),
(102, 'RSE_N', 'Rosenberg Self-Esteem', 'At times I think I am no good at all.'),
(103, 'RSE_P', 'Rosenberg Self-Esteem', 'I feel that I have a number of good qualities.'),
(104, 'RSE_P', 'Rosenberg Self-Esteem', 'I am able to do things as well as most other people.'),
(105, 'RSE_N', 'Rosenberg Self-Esteem', 'I feel I do not have much to be proud of.'),
(106, 'RSE_N', 'Rosenberg Self-Esteem', 'I certainly feel useless at times.'),
(107, 'RSE_P', 'Rosenberg Self-Esteem', 'I feel that I\'m a person of worth.'),
(108, 'RSE_N', 'Rosenberg Self-Esteem', 'I wish I could have more respect for myself.'),
(109, 'RSE_N', 'Rosenberg Self-Esteem', 'All in all, I am inclined to think that I am a failure.'),
(110, 'RSE_P', 'Rosenberg Self-Esteem', 'I take a positive attitude toward myself.'),
-- Seed the 25 Official Career Decision Self-Efficacy Scale-Short Form (CDSES-SF) Questions
(201, 'CDSES_OI', 'Career Decision Self-Efficacy', 'Find information in the library about occupations you are interested in.'),
(202, 'CDSES_GS', 'Career Decision Self-Efficacy', 'Select one major from a list of potential majors you are considering.'),
(203, 'CDSES_PL', 'Career Decision Self-Efficacy', 'Make a plan of your goals for the next five years.'),
(204, 'CDSES_PS', 'Career Decision Self-Efficacy', 'Determine the steps to take if you are having academic trouble with an aspect of your chosen major.'),
(205, 'CDSES_SA', 'Career Decision Self-Efficacy', 'Accurately assess your abilities.'),
(206, 'CDSES_GS', 'Career Decision Self-Efficacy', 'Select one occupation from a list of potential occupations you are considering.'),
(207, 'CDSES_PL', 'Career Decision Self-Efficacy', 'Determine the steps you need to take to successfully complete your chosen major.'),
(208, 'CDSES_PS', 'Career Decision Self-Efficacy', 'Persistently work at your major or career goal even when you get frustrated.'),
(209, 'CDSES_SA', 'Career Decision Self-Efficacy', 'Determine what your ideal job would be.'),
(210, 'CDSES_OI', 'Career Decision Self-Efficacy', 'Find out the employment trends for an occupation over the next ten years.'),
(211, 'CDSES_GS', 'Career Decision Self-Efficacy', 'Choose a career that will fit your preferred lifestyle.'),
(212, 'CDSES_PL', 'Career Decision Self-Efficacy', 'Prepare a good resume.'),
(213, 'CDSES_PS', 'Career Decision Self-Efficacy', 'Change majors if you did not like your first choice.'),
(214, 'CDSES_SA', 'Career Decision Self-Efficacy', 'Decide what you value most in an occupation.'),
(215, 'CDSES_OI', 'Career Decision Self-Efficacy', 'Find out about the average yearly earnings of people in an occupation.'),
(216, 'CDSES_PS', 'Career Decision Self-Efficacy', 'Make a career decision and then not worry about whether it was right or wrong.'),
(217, 'CDSES_PL', 'Career Decision Self-Efficacy', 'Change occupations if you are not satisfied with the one you enter.'),
(218, 'CDSES_SA', 'Career Decision Self-Efficacy', 'Figure out what you are and are not ready to sacrifice to achieve your career goals.'),
(219, 'CDSES_OI', 'Career Decision Self-Efficacy', 'Talk with a person already employed in the field you are interested in.'),
(220, 'CDSES_GS', 'Career Decision Self-Efficacy', 'Choose a major or career that will fit your interests.'),
(221, 'CDSES_PL', 'Career Decision Self-Efficacy', 'Identify employers, forms, institutions relevant to your career possibilities.'),
(222, 'CDSES_SA', 'Career Decision Self-Efficacy', 'Define the type of lifestyle you would like to live.'),
(223, 'CDSES_OI', 'Career Decision Self-Efficacy', 'Find information about graduate or professional schools.'),
(224, 'CDSES_PS', 'Career Decision Self-Efficacy', 'Successfully manage the job interview process.'),
(225, 'CDSES_GS', 'Career Decision Self-Efficacy', 'Identify some reasonable major or career alternatives if you are unable to get your first choice.')
ON DUPLICATE KEY UPDATE `category`=VALUES(`category`), `cat_name`=VALUES(`cat_name`), `question_text`=VALUES(`question_text`);

-- ----------------------------------------------------------------------------
-- 3. Student Respondents Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `respondents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `respondent_id` VARCHAR(30) NOT NULL UNIQUE,
    `grade_level` VARCHAR(20) NOT NULL,
    `strand` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 4. Assessment Item Responses (Per Question Response Record)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `assessment_responses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `respondent_id` VARCHAR(30) NOT NULL,
    `question_id` INT NOT NULL,
    `answer_value` INT NOT NULL, -- RIASEC: 1=Agree, 0=Disagree | RSE: 1=Strongly Agree to 4=Strongly Disagree | CDSES-SF: 1=No confidence to 5=Complete confidence
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`respondent_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 5. Calculated Assessment Results
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `assessment_results` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `respondent_id` VARCHAR(30) NOT NULL UNIQUE,
    `score_r` INT DEFAULT 0,
    `score_i` INT DEFAULT 0,
    `score_a` INT DEFAULT 0,
    `score_s` INT DEFAULT 0,
    `score_e` INT DEFAULT 0,
    `score_c` INT DEFAULT 0,
    `dominant_code` VARCHAR(10) NOT NULL,
    `rse_score_likert` INT DEFAULT 0,
    `rse_score_guttman` INT DEFAULT 0,
    `rse_interpretation` VARCHAR(50) DEFAULT NULL,
    `cdses_score_sa` INT DEFAULT 0,
    `cdses_score_oi` INT DEFAULT 0,
    `cdses_score_gs` INT DEFAULT 0,
    `cdses_score_pl` INT DEFAULT 0,
    `cdses_score_ps` INT DEFAULT 0,
    `cdses_avg_sa` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_avg_oi` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_avg_gs` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_avg_pl` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_avg_ps` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_total_score` INT DEFAULT 0,
    `cdses_total_avg` DECIMAL(3,2) DEFAULT 0.00,
    `cdses_interpretation` VARCHAR(50) DEFAULT NULL,
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`respondent_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
