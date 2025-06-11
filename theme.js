// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update icon
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Add theme styles
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    :root {
        --primary-color: #28a745;
        --text-color: #333;
        --bg-color: #ffffff;
        --card-bg: #ffffff;
        --border-color: #dee2e6;
        --navbar-bg: #ffffff;
        --btn-primary-bg: #28a745;
        --btn-primary-hover: #218838;
    }

    .dark-theme {
        --primary-color: #0d6efd;
        --text-color: #e9ecef;
        --bg-color: #212529;
        --card-bg: #2c3034;
        --border-color: #495057;
        --navbar-bg: #2c3034;
        --btn-primary-bg: #0d6efd;
        --btn-primary-hover: #0b5ed7;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color 0.3s, color 0.3s;
    }

    .navbar {
        background-color: var(--navbar-bg) !important;
    }

    .nav-link {
        color: var(--text-color) !important;
    }

    .nav-link:hover {
        color: var(--primary-color) !important;
    }

    .navbar-brand {
        color: var(--primary-color) !important;
    }

    .card {
        background-color: var(--card-bg);
        border-color: var(--border-color);
    }

    .theme-text {
        color: var(--text-color) !important;
    }

    .theme-image {
        filter: brightness(0.8) contrast(1.2);
    }

    .btn-primary {
        background-color: var(--btn-primary-bg);
        border-color: var(--btn-primary-bg);
    }

    .btn-primary:hover {
        background-color: var(--btn-primary-hover);
        border-color: var(--btn-primary-hover);
    }

    .btn-outline-primary {
        color: var(--primary-color);
        border-color: var(--primary-color);
    }

    .btn-outline-primary:hover {
        background-color: var(--primary-color);
        color: var(--bg-color);
    }

    .dark-theme .btn-outline-primary {
        color: var(--text-color);
        border-color: var(--text-color);
    }

    .dark-theme .btn-outline-primary:hover {
        background-color: var(--text-color);
        color: var(--bg-color);
    }

    .modal-content {
        background-color: var(--card-bg);
        color: var(--text-color);
    }

    .form-control {
        background-color: var(--bg-color);
        color: var(--text-color);
        border-color: var(--border-color);
    }

    .form-control:focus {
        background-color: var(--bg-color);
        color: var(--text-color);
        border-color: var(--primary-color);
    }

    .text-primary {
        color: var(--primary-color) !important;
    }

    .blockquote-footer {
        color: var(--primary-color) !important;
    }

    .feature-card {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
    }

    .feature-card i {
        color: var(--primary-color);
    }

    /* Additional styles for other pages */
    .dark-theme .table {
        color: var(--text-color);
    }

    .dark-theme .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .dark-theme .table-hover tbody tr:hover {
        background-color: rgba(255, 255, 255, 0.075);
    }

    .dark-theme .list-group-item {
        background-color: var(--card-bg);
        border-color: var(--border-color);
        color: var(--text-color);
    }

    .dark-theme .accordion-button {
        background-color: var(--card-bg);
        color: var(--text-color);
    }

    .dark-theme .accordion-button:not(.collapsed) {
        background-color: var(--primary-color);
        color: var(--bg-color);
    }

    .dark-theme .accordion-body {
        background-color: var(--card-bg);
        color: var(--text-color);
    }
`;
document.head.appendChild(themeStyles); 