1️⃣ Replace External Image URLs with Local Image Files
Current Issue:

Images are currently loaded using external links (URLs).

Required Changes:

Replace all image URLs with locally stored image files (.png, .jpg, .webp, etc.).

Organize images inside:

/src/assets/images/

Import images using ES module syntax:

import project1 from "@/assets/images/project1.png";

Update project data structure to reference imported image files instead of string URLs.

Ensure:

Proper alt text is included

Images are responsive

Images maintain consistent size inside cards

Do not use raw public URLs.

2️⃣ Create a Contact Page UI (Frontend Only)

Add a new route:

/contact
Contact Page Requirements:

Create a modern, clean, and responsive contact form that includes:

Name input field

Email input field

Message textarea

Submit button

UI Behavior (Frontend Simulation Only):

Validate required fields.

Show:

Success message (e.g., "Message sent successfully!")

Error message if fields are empty.

Include loading state when clicking submit (simulated).

Do NOT actually send data to Discord or implement webhook logic.

Instead, simulate submission using:

useState

or mock async function with setTimeout

3️⃣ UI/UX Requirements

Clean, modern design

Subtle hover effects

Smooth input focus animations

Responsive layout

Optional: small icon next to each input field

Use SCSS modules or structured styling

4️⃣ Code Quality Requirements

Create reusable components:

ContactForm

InputField

Keep project structure clean

Add comments explaining important logic

Use proper TypeScript types for form data

5️⃣ Expected Output

Updated project image import example

Updated ProjectCard example with local image

New Contact page component

Form validation logic

Folder structure update suggestion