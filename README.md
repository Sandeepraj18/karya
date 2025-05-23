
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3629b1ca-c37e-46d0-aaff-e724c768a4fe

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3629b1ca-c37e-46d0-aaff-e724c768a4fe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Building the Android app

To build and run the Android app:

1. Make sure you have Android Studio installed
2. Pull the latest changes: `git pull`
3. Install dependencies: `npm install`
4. Build the web app: `npm run build`
5. Sync with Capacitor: `npx cap sync`
6. Add Android platform if not added: `npx cap add android`
7. Open in Android Studio: `npx cap open android`
8. Run directly on a device/emulator: `npx cap run android`

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Capacitor (for mobile app development)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3629b1ca-c37e-46d0-aaff-e724c768a4fe) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains in Lovable and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).
