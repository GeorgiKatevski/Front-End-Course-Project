# Real Estate Property Management Platform

## Overview

The **Real Estate Property Management Platform** is a web-based application designed to facilitate the buying, selling, and management of properties. The platform offers a user-friendly interface for property owners to list their properties, while prospective buyers can search, filter, and view property listings based on various criteria. The system includes robust user authentication, property management features, and a statistics page for analyzing property data. The application leverages Firebase for backend services, including authentication, data storage, and real-time database management.

## Features

### User Management
- **User Registration**: Users can register with a username, email, and password. Managed through Firebase Authentication.
- **User Login**: Registered users can log in using their email and password.
- **User Profile Management**: Users can update their profile information and reset passwords.

### Property Management
- **Add Property**: Users can add property listings with details like title, description, price, location, and type (house or apartment).
- **Edit Property**: Users can edit their own property listings.
- **Delete Property**: Users can delete their own property listings.
- **View Properties**: All users can view and explore property listings.

### Search and Filtering
- **Search Properties**: Search by location, minimum price, and maximum price.
- **Filter Properties**: Filter by property type (house or apartment).
- **Sorting**: Sort listings by title, price, and date.
- **Chatbot Assistance**: The search page integrates a chatbot powered by OpenAI's API, offering users assistance in finding properties. Users can ask the chatbot questions about available properties, filtering options, and more. This feature enhances the user experience by providing quick answers and guidance.

### Statistics Page
- **Property Statistics**: Visual representation of property prices across locations.
- **Chart Representation**: Data visualization using charts (e.g., bar or line charts).

### Contact Page
- **User Contact Form**: A form to send inquiries or feedback.
- **Help and Support**: A section for help and support information.

## Screenshots

### 1. Main Page (Property Listings)
![Main Page - Property Listings](imgs/mainPage.jpeg)
*The main page where users can view all available property listings, complete with search and filtering options.*

### 2. Property Details Page
![Property Details](imgs/DetailsPage.jpeg)
*Detailed view of a selected property, showcasing its title, description, price, location, and other relevant information.*

### 3. Search Page (with Chatbot)
![Search Page - Chatbot Integration](imgs/SearchPage.jpeg)
*The search page featuring a chatbot that assists users in finding the right property by answering questions and providing suggestions.*

### 4. Add Property Page
![Add Property](imgs/AddHousePage.jpeg)
*Page where users can add new properties to the platform by filling out a form with property details.*

### 5. Edit Property Page
![Edit Property](imgs/EditDetailsPage.jpeg)
*Page for editing existing property listings, allowing users to update details like price, description, and location.*

### 6. Contact Us Page
![Contact Us](imgs/ContactPage.jpeg)
*Form where users can submit inquiries or feedback directly to the platform administrators.*

### 7. Statistics Page
![Statistics](imgs/StatisticsPage.png)
*Page displaying property statistics through various charts, helping users analyze trends and make informed decisions.*

## Non-Functional Requirements

### Performance
- The application loads quickly and supports a high number of concurrent users.
- Optimized Firebase real-time database for quick operations.

### Scalability
- The platform scales to accommodate growing numbers of users and listings.
- Firebase infrastructure ensures scalability.

### Security
- Secure storage of user data via Firebase Authentication.
- Access control ensures only property owners can modify or delete their listings.
- Encrypted data communication using HTTPS.

### Usability
- Intuitive user interface with responsive design for various devices.
- Form validation to prevent invalid data entries.

### Maintainability
- Modular and well-documented codebase for easy maintenance and updates.
- Organized Firebase functions and cloud storage.

### Reliability
- High availability with Firebase providing redundancy and backups.
- Robust error handling for unexpected issues.

## Project Modules

1. **User Authentication Module**: Manages user registration, login, and profile updates via Firebase Authentication.
2. **Property Management Module**: Handles property listing, editing, deletion, and viewing.
3. **Search and Filtering Module**: Implements search, filtering, and sorting functionality, including chatbot integration.
4. **Statistics Module**: Displays property statistics using data visualization tools.
5. **Contact Module**: Facilitates user inquiries and support.

## Deployment on Firebase

### Steps for Deployment:

1. **Set Up Firebase Hosting**: Deploy the web application using Firebase Hosting.
2. **Configure Firebase Authentication**: Set up Firebase Authentication for user management.
3. **Set Up Firebase Firestore/Realtime Database**: Store property data and user information.
4. **Testing and Optimization**: Test and optimize the application post-deployment.
5. **Final Launch**: Finalize deployment and go live.

## Getting Started

To get started with the project, clone the repository and follow the setup instructions. Ensure that you have Firebase set up and configured according to the project's needs.

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
