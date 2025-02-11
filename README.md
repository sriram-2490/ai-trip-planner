# AI Travel Planner

**AI Travel Planner** is an AI-powered application that helps individuals who want to travel to a particular area but are unsure of where to go, based on their available time and budget. The AI Travel Planner provides recommendations based on users' search preferences, assisting them in making informed decisions about their travel destinations and activities.

---

## Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [How to Install and Run](#how-to-install-and-run)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)
7. [Credits](#credits)

---

## Project Description

This project was developed for individuals who are looking to travel to a particular area but have no idea where to go, based on their available time and budget. The AI Travel Planner uses AI to offer travel recommendations, suggesting the best destinations and activities that fit the user's criteria.

---

## Technologies Used

-   `@google/generative-ai`: "^0.21.0"
-   `@radix-ui/react-dialog`: "^1.1.6"
-   `@radix-ui/react-popover`: "^1.1.6"
-   `@radix-ui/react-slot`: "^1.1.2"
-   `@react-oauth/google`: "^0.12.1"
-   `axios`: "^1.7.9"
-   `class-variance-authority`: "^0.7.1"
-   `clsx`: "^2.1.1"
-   `firebase`: "^11.3.0"
-   `lucide-react`: "^0.475.0"
-   `next-themes`: "^0.4.4"
-   `react`: "^18.3.1"
-   `react-dom`: "^18.3.1"
-   `react-google-places-autocomplete`: "^4.1.0"
-   `react-icons`: "^5.4.0"
-   `react-router-dom`: "^7.1.5"
-   `sonner`: "^1.7.4"
-   `tailwind-merge`: "^3.0.1"
-   `tailwindcss-animate`: "^1.0.7"

---

## How to Install and Run

To set up the **AI Travel Planner** on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/sriram-2490/ai-trip-planner.git](https://github.com/sriram-2490/ai-trip-planner.git)
    cd ai-trip-planner
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Your app will now be available at `http://localhost:5173`.

---

## Usage

To use the AI Travel Planner:

1.  **Set up the project:** Follow the installation steps above.

2.  **Generate API keys:** Obtain API keys for Google Places API and Google Gemini AI API.  You'll need these to use the application's features.

3.  **Configure API keys:** Create a `.env` file in the root of your project (if it doesn't already exist) and replace the placeholder API keys with your actual keys:

    ```plaintext
    VITE_GOOGLE_PLACE_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
    VITE_GOOGLE_GEMINI_AI_API_KEY=YOUR_GOOGLE_GEMINI_AI_API_KEY
    VITE_GOOGLE_AUTH_CLIENT_ID=YOUR_GOOGLE_AUTH_CLIENT_ID  # For Google OAuth if used
    ```

4.  **Start the application:**  Once the `.env` file is configured, start the development server (if you haven't already). The application will then be ready to provide travel recommendations based on your input.

---

## Contributing

Contributions are welcome!  If you'd like to contribute, please follow these steps:

1.  **Fork the repository:** Click the "Fork" button on the GitHub page.

2.  **Create a new branch:** Create a branch for your feature or bug fix.  Give it a descriptive name (e.g., `feature/add-search-filters`, `bugfix/fix-map-display`).

3.  **Commit your changes:** Make your changes and commit them with clear, concise messages.

4.  **Open a pull request:** Submit a pull request to the main repository.  Describe your changes in detail.

Please adhere to the project's coding style and ensure your changes work across different screen sizes and browsers.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Credits

This project was developed by Sriram. Special thanks to the open-source community for their contributions to React, Tailwind CSS, and the other technologies used in this project.
