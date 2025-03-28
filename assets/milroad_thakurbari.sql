-- Database: milroad_thakurbari

CREATE DATABASE IF NOT EXISTS milroad_thakurbari CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE milroad_thakurbari;

-- Users table for admin authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'editor',
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Committee members table
CREATE TABLE committee_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    photo_url VARCHAR(255),
    bio TEXT,
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Events table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_bn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255) NOT NULL,
    description_bn TEXT,
    description_en TEXT,
    description_hi TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    location_bn VARCHAR(255),
    location_en VARCHAR(255),
    location_hi VARCHAR(255),
    image_url VARCHAR(255),
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Gallery categories table
CREATE TABLE gallery_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_bn VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Gallery images table
CREATE TABLE gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    year YEAR NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    caption_bn VARCHAR(255),
    caption_en VARCHAR(255),
    caption_hi VARCHAR(255),
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES gallery_categories(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- Notices table
CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_bn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255) NOT NULL,
    content_bn TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_hi TEXT NOT NULL,
    publish_date DATETIME NOT NULL,
    expiry_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- Donations table
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    donation_date DATE NOT NULL,
    payment_method ENUM('cash', 'bank', 'mobile_banking') NOT NULL,
    receipt_number VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Settings table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value_bn TEXT,
    setting_value_en TEXT,
    setting_value_hi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Sample data insertion

-- Admin user
INSERT INTO users (username, password_hash, full_name, email, role) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'প্রশাসক', 'admin@thakurbari.com', 'admin');

-- Committee members
INSERT INTO committee_members (name, position, phone, email, photo_url, bio, join_date)
VALUES 
('ড. অরুণ কুমার চক্রবর্তী', 'সভাপতি', '01700676679', 'arun@example.com', 'president.jpg', 'দীর্ঘ ১৫ বছর ধরে কমিটির সাথে যুক্ত', '2010-01-15'),
('প্রদীপ কুমার সাহা', 'সাধারণ সম্পাদক', '01722980151', 'pradeep@example.com', 'secretary.jpg', '২০১৫ সাল থেকে দায়িত্ব পালন করছেন', '2015-04-20');

-- Gallery categories
INSERT INTO gallery_categories (name_bn, name_en, name_hi)
VALUES 
('পূজা', 'Puja', 'पूजा'),
('সাংস্কৃতিক', 'Cultural', 'सांस्कृतिक'),
('নির্মাণ', 'Construction', 'निर्माण'),
('লোকজন', 'People', 'लोग');

-- Events
INSERT INTO events (title_bn, title_en, title_hi, description_bn, description_en, description_hi, start_date, end_date, location_bn, location_en, location_hi, image_url, status)
VALUES 
('২০২৫ বারোয়ারী পূজা', '2025 Community Puja', '2025 सामुदायिक पूजा', '৭২তম বারোয়ারী পূজার আয়োজন', '72nd annual community puja', '72वां वार्षिक सामुदायिक पूजा', '2025-10-10 08:00:00', '2025-10-14 22:00:00', 'মূল মণ্ডপ', 'Main Mandap', 'मुख्य मंडप', 'puja-2025.jpg', 'upcoming'),
('২০২৪ সাংস্কৃতিক অনুষ্ঠান', '2024 Cultural Program', '2024 सांस्कृतिक कार्यक्रम', 'বছরান্তর সাংস্কৃতিক সন্ধ্যা', 'Annual cultural evening', 'वार्षिक सांस्कृतिक संध्या', '2024-10-15 18:00:00', '2024-10-15 22:00:00', 'মণ্ডপ প্রাঙ্গণ', 'Mandap Premises', 'मंडप परिसर', 'cultural-2024.jpg', 'completed');

-- Notices
INSERT INTO notices (title_bn, title_en, title_hi, content_bn, content_en, content_hi, publish_date, expiry_date, is_active, created_by)
VALUES 
('২০২৫ পূজা কমিটি সভা', '2025 Puja Committee Meeting', '2025 पूजा समिति बैठक', 'আগামী ১৫ জুন ২০২৫ সন্ধ্যা ৬টায় পূজা কমিটির সভা অনুষ্ঠিত হবে', 'Puja committee meeting will be held on 15th June 2025 at 6pm', '15 जून 2025 को शाम 6 बजे पूजा समिति की बैठक आयोजित की जाएगी', '2025-05-20 00:00:00', '2025-06-15 00:00:00', TRUE, 1),
('অনুদান আহ্বান', 'Donation Appeal', 'दान अपील', '২০২৫ সালের পূজার জন্য অনুদান আহ্বান করা হলো', 'Donation appeal for 2025 puja', '2025 की पूजा के लिए दान की अपील', '2025-01-10 00:00:00', '2025-09-30 00:00:00', TRUE, 1);

-- Settings
INSERT INTO settings (setting_key, setting_value_bn, setting_value_en, setting_value_hi)
VALUES 
('contact_address', 'মিলরোড, সেতাবগঞ্জ, বোচাগঞ্জ, দিনাজপুর', 'Milroad, Setabganj, Bochaganj, Dinajpur', 'मिलरोड, सेताबगंज, बोचागंज, दिनाजपुर'),
('contact_phone', '০১৭০০৬৭৬৬৭৯, ০১৭২২৯৮০১৫১', '01700676679, 01722980151', '01700676679, 01722980151'),
('contact_email', 'millroadthakurbarimondob@gmail.com', 'millroadthakurbarimondob@gmail.com', 'millroadthakurbarimondob@gmail.com');

-- Donations
INSERT INTO donations (donor_name, amount, phone, email, address, donation_date, payment_method, receipt_number, notes)
VALUES 
('রঞ্জিত কুমার সাহা', 5000.00, '01711223344', 'ranjit@example.com', 'মিলরোড, দিনাজপুর', '2025-01-15', 'bank', 'BANK-2025-001', 'বিকাশ মাধ্যমে পাঠানো হয়েছে'),
('মালা দেবনাথ', 3000.00, '01755667788', NULL, 'সেতাবগঞ্জ, দিনাজপুর', '2025-02-20', 'cash', 'CASH-2025-002', NULL);
