### Environment configuration

Use a local file named `.env.local` in the project root (`Corptube/`) for development.

Required variables:

- MONGODB_URI: MongoDB connection string
- BASE_URL: Public base URL of the app (e.g., https://example.com)
- SMTP_HOST: SMTP host (e.g., smtp.gmail.com)
- SMTP_PORT: SMTP port (e.g., 587)
- SMTP_USER: SMTP username/email
- SMTP_PASS: SMTP password/app password
- CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_API_SECRET: Cloudinary API secret

Notes:
- Next.js automatically loads `.env.local` and `.env` in server code.
- Do not commit real secrets. `.env*` files are git-ignored.
- `PROJECT_URL` was previously used for the database URI; it is still read as a fallback, but you should rename it to `MONGODB_URI`.
- For Gmail SMTP, use app passwords instead of your regular password.

