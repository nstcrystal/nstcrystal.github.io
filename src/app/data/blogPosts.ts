import type { BlogPost } from "../types";

/**
 * Blog Posts Data - Owner Managed
 *
 * This file contains all blog posts for the website.
 * Only the website owner can add/edit posts by modifying this file.
 *
 * Benefits of this approach:
 * 1. No database required - faster and simpler
 * 2. Version controlled - track changes with Git
 * 3. Secure - no public CRUD endpoints to exploit
 * 4. SEO friendly - content is server-rendered
 * 5. Easy to maintain - just edit this file
 *
 * To add a new post:
 * 1. Create a new object with unique id
 * 2. Fill in title, content (supports Markdown), date, and tags
 * 3. Add to the array below
 */

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hello",
    content: `
# Xin chào !!!

Đây là nơi tôi đăng các Blog của riêng mình

---

Thật ra thì cũng không có gì nhiều đâu nhưng mà cứ đăng cho nó \`sinh động\`

Và cũng cho những ai trong \`tương lai\` có tò mò mà vào đây đọc nhưng bài Post này 

---

> Nếu có gì muốn nhắn gửi đến tôi thì hãy ghé qua phần \`Contact\` nhé.
  À trang \`Contact\` chỉ mới có giao diện thôi, tôi chưa thêm ~~chức năng~~ cho nó 


    `,
    createdAt: "2026-02-20T10:00:00Z",
    tags: ["Life"],
  },
  {
    id: "2",
    title: "Test",
    content: `

Tôi đang test trang này có hoạt động đúng cách không

\`\`\`python
print("hello world")
\`\`\`
      `,
    createdAt: "2026-02-22T00:00:00Z",
    tags: ["Life"],
  },
  {
    id: "3",
    title: "Lazy and Timid",
    content: `

Hơn 2 tuần rồi

Và tôi vẫn chưa làm cái Sever để chạy cái \`Contact Form\` ở bên trang \`Contact\` :))

## Lười quá và không có thời gian

> Trong vòng tuần sau ~chắc chắn~ sẽ làm


      `,
    createdAt: "2026-03-8T00:00:00Z",
    tags: ["Life"],
  },


];
