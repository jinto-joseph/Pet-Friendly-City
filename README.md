# 🐾 PetCity - Making Cities Pet-Friendly 🏡

"Transforming Urban Landscapes into Havens for Our Furry Friends!"

A modern, responsive website dedicated to the Pet-Friendly City Campaign. This project aims to raise awareness, promote pet welfare, and facilitate pet adoption and surrender processes in urban areas, fostering a more compassionate community for animals.

## ✨ Features

- 🏠   **Modern & Responsive Design**: Built with Bootstrap 5 for a seamless experience across all devices.
- 🎨   **Dynamic Theme Toggling**: Easily switch between light and dark themes to suit user preference.
- 🐕   **Interactive Pet Adoption Carousel**: Discover adoptable pets with detailed profiles and smooth transitions.
- 💌   **Streamlined Adoption & Surrender Forms**: Directly submit requests via EmailJS for efficient processing.
- 📞   **Integrated Contact Form**: Connect with the organization via a pre-filled Google Form for inquiries.
- 🤝   **Volunteer Sign-up**: Join the movement by signing up through a pre-filled Google Form.
- 📖   **Inspiring Impact Stories**: Showcase heartwarming rescue, adoption, and community initiatives.
- 💬   **PawBuddy Chatbot**: Get instant assistance and information about the campaign.
- 🗺️   **Comprehensive Resources**: Access valuable information for pet care and welfare.
- 📱   **Mobile-First Approach**: Optimized for excellent usability on smartphones and tablets.

## 🚀 Getting Started

Follow these steps to get your PetCity website up and running locally.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
-   An EmailJS account for adoption and surrender form functionality (get your Service ID and Template IDs).
-   A Google account to create and link Google Forms for contact and volunteer sign-ups.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/petcity.git
    cd petcity
    ```
    (Replace `yourusername` with your actual GitHub username or the repository URL)

2.  **Open the website:**
    Simply open the `index.html` file in your preferred web browser.

## 📁 Project Structure

```
petcity/
├── index.html            # Main landing page
├── learn-more.html       # Page for more details about the campaign
├── stories.html          # Page showcasing impact stories
├── resources.html        # Page with pet resources
├── style.css             # Custom CSS for styling and theme variables
├── script.js             # Core JavaScript for interactivity, forms, and carousel
├── theme.js              # JavaScript for handling theme toggling and persistence
└── assets/               # Directory for images, GIFs, and other media
    ├── dog-running.gif
    ├── hero-image.jpg
    ├── pet1.jpg
    ├── pet2.jpg
    ├── pet3.jpg
    ├── pet4.jpg
    ├── pet5.jpg
    ├── pet6.jpg
    └── story_images/     # (Consider adding subfolders for better organization)
        ├── story1.jpg
        ├── story2.jpg
        └── ... (more online story images)
```

## 🛠️ Technologies Used

-   **HTML5**: Structure and content
-   **CSS3**: Styling and responsive design
-   **JavaScript (ES6+)**: Dynamic content, interactivity, and form handling
-   **Bootstrap 5.3.0**: Responsive framework and UI components
-   **Font Awesome 6.0.0**: Vector icons
-   **Google Fonts (Poppins)**: Custom typography
-   **EmailJS**: For sending adoption and surrender requests directly via email
-   **Google Forms**: For handling contact inquiries and volunteer sign-ups

## ⚙️ Customization

### 🌈 Theme Colors

Customize the website's color scheme by modifying the CSS variables in `style.css`:

```css
:root { /* Light Theme */
    --primary-color: #28a745; /* Green */
    --secondary-color: #6c757d; /* Gray */
    --bg-color: #ffffff; /* Page background */
    --text-color: #333333; /* Default text */
    --card-bg: #ffffff; /* Card backgrounds */
    --input-bg: #f8f9fa; /* Input field background */
    --input-text: #333333; /* Input field text */
    --input-border: #ced4da; /* Input field border */
    --placeholder-color: #6c757d; /* Input placeholder text */
    --form-text-color: #6c757d; /* Secondary form text */
}

[data-theme="dark"] { /* Dark Theme */
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --card-bg: #2d2d2d;
    --input-bg: #2d2d2d;
    --input-text: #ffffff;
    --input-border: #404040;
    --placeholder-color: #a0a0a0;
    --form-text-color: #a0a0a0;
    /* Primary & secondary colors remain consistent in dark mode */
}
```

### 📧 EmailJS Configuration

The adoption and surrender forms use EmailJS to send notifications.
1.  Sign up for an account at [EmailJS](https://www.emailjs.com/).
2.  Add a new Email Service (e.g., Gmail).
3.  Create two new Email Templates:
    *   One for **Adoption Requests** (e.g., `template_2v3ulhk`)
    *   One for **Pet Surrender Requests** (e.g., `template_pwh03s9`)
4.  Update your `script.js` file with your EmailJS **Public Key** and the correct **Template IDs**:

    ```javascript
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your Public Key
    })();

    // ... inside adoption form handler ...
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_ADOPTION_TEMPLATE_ID', templateParams)
        // ...

    // ... inside surrender form handler ...
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_SURRENDER_TEMPLATE_ID', templateParams)
        // ...
    ```
    (Note: `service_umxvayz` and `template_pwh03s9` are currently in your code, ensure they match your EmailJS setup).

### 📝 Google Forms Integration

The Contact Us and Volunteer forms redirect to Google Forms with pre-filled data.
1.  **Create your Google Forms:**
    *   **Contact Us Form**: [https://docs.google.com/forms/d/e/1FAIpQLSf2jjItS8WeyvMIEcoRlRdPAINOQTiz-aN0qs3jq3RkKG78Kw/viewform](https://docs.google.com/forms/d/e/1FAIpQLSf2jjItS8WeyvMIEcoRlRdPAINOQTiz-aN0qs3jq3RkKG78Kw/viewform)
    *   **Volunteer Form**: You will need to create this if you haven't already and get its shareable link.
2.  **Get Pre-filled Link Parameters (Entry IDs):**
    *   For **each** Google Form you use, open it in edit mode.
    *   Click the "Send" button -> "Link" tab -> "Get pre-filled link".
    *   Fill in dummy data for each field you want to pre-fill.
    *   Click "Get Link" and copy the generated URL.
    *   Extract the `entry.xxxxxxxx` values for each field (e.g., `entry.123456789`).
3.  **Update `script.js` with Entry IDs:**
    Replace the placeholder `entry.id` values in `script.js` with your actual IDs:

    ```javascript
    // For Contact Us Form
    const nameEntryId = "entry.509298931";
    const emailEntryId = "entry.159109244";
    const subjectEntryId = "entry.910979992";
    const messageEntryId = "entry.197902082";

    // For Volunteer Form (you'll need to get these IDs similarly)
    const volunteerNameEntryId = "entry.YOUR_VOLUNTEER_NAME_ID";
    const volunteerCityEntryId = "entry.YOUR_VOLUNTEER_CITY_ID";
    const volunteerRoleEntryId = "entry.YOUR_VOLUNTEER_ROLE_ID";
    const volunteerEmailEntryId = "entry.YOUR_VOLUNTEER_EMAIL_ID";
    ```
    Also ensure the `googleFormUrl` for the volunteer form points to your *actual* volunteer Google Form.

### 🖼️ Images & Media

Replace the placeholder images and GIFs in the `assets/` folder with your own high-quality media.

## 🤝 Contributing

We welcome contributions to make PetCity even better!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/your-awesome-feature`).
3.  Commit your changes (`git commit -m 'feat: Add your awesome feature'`).
4.  Push to the branch (`git push origin feature/your-awesome-feature`).
5.  Open a Pull Request, describing your changes.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 📞 Contact

Have questions or suggestions? Feel free to reach out!

-   **Your Name/Organization Name** - [your_email@example.com](mailto:your_email@example.com)
-   **Project Link:** [https://github.com/yourusername/petcity](https://github.com/yourusername/petcity) 