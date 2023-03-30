# Unpuzzle
Welcome to Unpuzzle, a web application designed to help students complete their Edpuzzle assignments quickly and efficiently using OpenAI's GPT-3 model. This application is built using TypeScript, Next.js, and styled with Chakra UI, with a backend implemented using Supabase and Stripe for payment processing.

Unpuzzle provides students with a way to get instant help on their Edpuzzle assignments by generating unique open-ended answers using OpenAI's GPT-3 model. With Unpuzzle, students can easily autocomplete their assignments, saving time and reducing stress.

Unpuzzle has accumulated over 15,000 users and over 80,000 Edpuzzles solved, which reflects the usefulness and value of our application to students.

<img width="813" alt="analytics" src="https://user-images.githubusercontent.com/44245721/228969452-005abad2-8dd0-41bb-939d-0fa13bcda4d9.png">



## Features
Unpuzzle has several features that make it a powerful tool for helping students complete their Edpuzzle assignments, including:

- Edpuzzle integration: Unpuzzle integrates with Edpuzzle's API to retrieve assignments and multiple choice questions for students, making it easy for students to complete their assignments without the hassle of watching the video or searching for answers.

<img width="1493" alt="edpuzzle" src="https://user-images.githubusercontent.com/44245721/228968364-371cf6b2-b7b2-42fa-97b3-89329ac6fa2e.png">
<img width="1493" alt="autocomplete" src="https://user-images.githubusercontent.com/44245721/228968535-2c544f43-7815-47d7-84eb-8fceccfeded1.png">

- OpenAI GPT-3 model: Unpuzzle uses OpenAI's GPT-3 model to generate unique open-ended answers for each Edpuzzle assignment, providing students with a fast and accurate way to complete their assignments.

<img width="1493" alt="ai" src="https://user-images.githubusercontent.com/44245721/228968437-49d4b364-3038-48b1-98ef-6a121fe8a5ae.png">

- Supabase backend: The app is built using Supabase, which provides a reliable and secure platform for storing and accessing user data, with real-time updates and serverless functions for easy scaling.

- Stripe payment processing: Unpuzzle offers a subscription-based service for students, with Stripe handling the payment processing securely and efficiently.

- Google Chrome extension: Unpuzzle offers a Google Chrome extension that simplifies the process of getting the Edpuzzle session token for students, making it easy to get started using the app. You can access it [here.](https://chrome.google.com/webstore/detail/unpuzzle/bkhmfdnoifikoinnhgbalpejgdakdlpc?)

<img width="1493" alt="extension" src="https://user-images.githubusercontent.com/44245721/228968600-ac049b9b-c542-4083-8faa-36c0a20db686.png">

## Getting Started
To get started with Unpuzzle, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm i`.
3. Set up a [Supabase](https://supabase.com/) project and save your Supabase credentials, including the URL and API key.
4. Set up a [Stripe](https://stripe.com/) account and save your API keys and secret API route.
5. Set up as many as 3 [OpenAI](https://openai.com/) accounts and save their API keys.
6. Set up [Google Analytics](https://analytics.google.com/) and save the ID as well as the ad client number.
5. Run the development server by running `npm run dev`.
6. Navigate to http://localhost:3000 to view the application.
7. Add the following environment variables to your .env.local file:
- `OPENAI_API_KEY[0-2]`: Your OpenAI API key. You can obtain a key by signing up for an account on the OpenAI website.
Make sure to include this variable in your .env.local file and add the file to your .gitignore file to keep your key secure. Add all 3 keys in the aforementioned format.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase API keys. You can obtain them by going to the Supabase website and setting up a project. Include these variables in your .env.local file.
- `NEXT_PUBLIC_STRIPE_KEY`, `STRIPE_SECRET_KEY` and `API_ROUTE_SECRET`: Your Stripe keys. Again, you can get these by signing up for a Stripe account and setting up payment processing via their website.
- `NEXT_PUBLIC_GA_ID` and `G_AD_CLIENT`: Google Analytics information. These are fine to publicly expose, but we decided to add them in the .env.local for the sake of consistency. If you want to track statistics in your instance, create a Google Analytics account and find your IDs.

## Getting Help
If you have any questions or run into any issues with Unpuzzle, please feel free to reach out to our team by opening an issue on our GitHub repository. We are always happy to help and are committed to providing a positive experience for all users of our application.
