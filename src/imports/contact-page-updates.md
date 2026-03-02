1️⃣ Add Multiple “Connect” / Social Contact Options
Requirement:

Create a dedicated Connect section (can be in Contact page or Footer) that includes multiple ways to reach the website owner.

Include:

GitHub

Facebook

YouTube

(Optional: LinkedIn, Email, Instagram)

Implementation Details:

Use recognizable icons (e.g., React Icons or similar).

Each item should include:

Icon

Platform name

Clickable link (open in new tab)

Add subtle hover effects:

Scale slightly

Color transition

Soft shadow

Layout should be:

Responsive

Clean and modern

Grid or flex-based

2️⃣ Update Contact Form Structure

Simplify the form to only include:

Name (input field)

Message (textarea)

Remove the email field.

3️⃣ Improve Textarea Behavior
Requirements:

The textarea should:

Have a defined minimum height

Automatically expand vertically when content exceeds the original height

Stop expanding at a reasonable max-height (optional)

NOT allow manual resize (disable drag-to-resize)

Technical Guidance:

Use useRef and useEffect to auto-adjust height

Set CSS:

resize: none;
overflow: hidden;
min-height: 120px;

Adjust height dynamically using:

textarea.style.height = "auto";
textarea.style.height = textarea.scrollHeight + "px";
4️⃣ UX Requirements

Clean modern layout

Smooth focus animation on inputs

Clear submit button with hover effect

Show success message after submit (simulate only)

Responsive on all screen sizes

5️⃣ Code Structure Requirements

Create reusable components:

SocialLinks

ContactForm

Proper TypeScript types

Clean folder structure

Comment key logic (especially auto-resizing textarea)

6️⃣ Expected Output

Social Connect section component example

Contact form component example

Auto-resizing textarea implementation

SCSS styling example

Explanation of UX improvements