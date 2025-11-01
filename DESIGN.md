
---

## **3️⃣ Security Considerations**

- **Password hashing**: bcrypt with 12 salt rounds  
- **JWT tokens**:  
  - Separate secrets for access and refresh tokens  
  - Access tokens short-lived (~15 min)  
  - Refresh tokens long-lived (~7 days)  
- **XSS protection**: all user inputs sanitized before saving  
- **CSRF mitigation**: JWT sent in `Authorization` headers (no cookies)  
- **CORS**: Only requests from trusted frontend domains allowed  
- **OAuth2**: Google login uses strict redirect URIs  

Optional improvements for production:

- Rate limiting login endpoints  
- Account lockout after multiple failed attempts  
- Logging suspicious authentication behavior  

---

## **4️⃣ Social Login (SSO)**

- **Google OAuth2** configured via Passport.js  
- **User creation on first login**: if a Google user does not exist, a new document is saved in MongoDB  
- **SSO across devices**: refresh tokens allow users to maintain sessions on multiple devices  
- **Token flow**:
  1. Client hits `/auth/google` → redirected to Google login  
  2. Google returns user to `/auth/google/callback`  
  3. Server issues JWT access + refresh tokens  

---

## **5️⃣ Input Validation**

- **Joi** enforces proper format for `email`, `password`, and `name`  
- Invalid requests are **rejected before reaching the controllers**  
- Prevents storing invalid or malicious data in the database  
- XSS sanitization applied to all user inputs before saving  

---

## **6️⃣ Observability**

- **Logging**:  
  - Errors, successful logins, failed login attempts  
- **Monitoring**: Can be extended using Prometheus, Grafana, or ELK stack  
- **Testing**: Integration tests for main authentication flows (register, login, SSO)  

---

## **7️⃣ Assumptions & Constraints**

- JWT tokens are sent in the `Authorization` header (`Bearer <token>`)  
- Only Google OAuth2 implemented initially  
- Frontend domain in dev: `http://localhost:3000`  
- MongoDB Atlas used for cloud database, IP whitelisting required  

---

## **8️⃣ Future Improvements**

- Add **Facebook and Twitter** OAuth2 login  
- Implement **rate limiting** and **account lockout** for security  
- Add **refresh token rotation** for extra security  
- Add **unit & integration tests for all endpoints**  
- Deploy monitoring with Prometheus/Grafana  

---

## **9️⃣ Folder Structure**

---
<pre style="white-space: pre-wrap;">
sales-platform-auth/
├─ src/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ routes/
│  ├─ validations/
│  ├─ utils/
│  └─ server.js
├─ .env
├─ Dockerfile
├─ docker-compose.yml
├─ README.md
├─ DESIGN.md      
├─ package.json
└─ package-lock.json
   </pre>