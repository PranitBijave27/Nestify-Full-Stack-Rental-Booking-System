# Nestify | Full-Stack Rental Marketplace

Nestify is a comprehensive web application designed to connect travelers with unique stays. Built with the **MVC (Model-View-Controller)** architecture, the platform features robust user authentication, listing management, and an interactive review system.

## 🚀 Features

* **Full CRUD Functionality:** Users can create, read, update, and delete listings.
* **User Authentication:** Secure signup and login powered by **Passport.js**.
* **Authorization Logic:** Proprietary middleware ensures only owners can edit/delete their listings or reviews.
* **Review System:** Integrated guest feedback loop with star ratings and author attribution.
* **Session & Flash:** Seamless user experience with temporary notifications and "return-to-page" login memory.
* **Security:** Environment variable protection using **Dotenv** and data sanitization.

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Frontend:** EJS (Embedded JavaScript Templates), Bootstrap 5, FontAwesome  
**Auth:** Passport.js (Local Strategy)  

---