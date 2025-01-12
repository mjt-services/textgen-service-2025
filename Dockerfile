# Use the official Deno image as the base image
FROM denoland/deno:alpine-2.0.0

# Set the working directory
WORKDIR /app

# Copy the built distributable files into the container
COPY dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "./dist/index.js"]