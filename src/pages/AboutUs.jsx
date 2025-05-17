// src/pages/About.jsx
import React from "react";
import styles from "./AboutUs.module.css";
import logoImage from "../assets/logo1.png"; // Assuming your logo is in this path
import html from "../assets/html.png";
import css from "../assets/css.svg";
import js from "../assets/js.png";
import react from "../assets/react.svg";
import MongoDB from "../assets/mongodb.webp";
import node from "../assets/node.png";
import express from "../assets/Expressjs.png";
import fonts from "../assets/Google_Fonts.png";
import postman from "../assets/postman.webp";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.firstSection}>
        <div className={styles.logoContainer}>
          <img src={logoImage} alt="Project Logo" className={styles.logo} />
        </div>
        <div className={styles.projectOverview}>
          <h2>About This Project</h2>
          <p className={styles.conciseDescription}>
            This project involved the end-to-end development of a user-friendly
            web application for discovering and booking hotel accommodations. As
            the sole full-stack developer, I managed all stages, from designing
            the React.js front-end to building the Node.js/Express.js back-end
            with a MongoDB database, and implementing user authentication. The
            goal was to create a seamless platform for users to browse hotels
            and make bookings.
          </p>
        </div>
      </section>

      {/* The rest of your sections will follow here */}
      <section className={styles.technicalHighlights}>
        <h2>Technical Implementation</h2>
        <div className={styles.highlightSection}>
          <h3>Front-end</h3>
          <p>
            The front-end of this application was built using React.js, a
            powerful JavaScript library known for its component-based
            architecture. This allowed for the creation of reusable and
            maintainable UI elements, contributing to a more organized and
            efficient codebase.
          </p>
          <p>
            For styling, CSS Modules were implemented to scope styles locally to
            each component, preventing naming conflicts and enhancing the
            modularity of the CSS. To ensure a consistent and user-friendly
            experience across various devices, responsive design principles were
            applied using media queries, adapting the layout and styling to
            different screen sizes.
          </p>
        </div>

        <div className={styles.highlightSection}>
          <h3>Back-end</h3>
          <p>
            The back-end API was developed using Node.js, an event-driven,
            non-blocking I/O runtime environment that excels at handling
            concurrent network requests, making it well-suited for a web
            application with potential for multiple users. The Express.js
            framework was chosen for its flexibility and robust routing
            capabilities, providing a structured and organized way to define API
            endpoints and handle server-side logic.
          </p>
          <p>
            RESTful API endpoints were designed and implemented to manage core
            functionalities, including fetching and displaying hotel listings,
            handling user registration and login, and processing basic booking
            requests. These endpoints follow standard HTTP methods and status
            codes for clear communication between the front-end and back-end.
          </p>
        </div>

        <div className={styles.highlightSection}>
          <h3>Database</h3>
          <p>
            MongoDB was selected as the NoSQL database for this project due to
            its flexible document-based structure. This schema-less approach
            allowed for easy management of hotel data with varying attributes
            and simplified the development process, especially in the initial
            stages where data structures might evolve. MongoDB's JSON-like
            documents and powerful querying capabilities provided an efficient
            way to store and retrieve application data.
          </p>
        </div>

        <div className={styles.highlightSection}>
          <h3>Authentication and Authorization</h3>
          <p>
            Secure user authentication was implemented using JSON Web Tokens
            (JWT). When users log in, the server issues a JWT, which is then
            stored on the client-side and included in subsequent requests. This
            stateless approach allows the server to verify the user's identity
            without relying on session cookies, enhancing scalability.
            Authorization was also implemented to protect specific API endpoints
            and ensure that only authenticated users can access certain
            functionalities.
          </p>
        </div>

        <div className={styles.techStack}>
          <img src={html} alt="html" className={styles.stack} />
          <img src={css} alt="css" className={styles.stack} />
          <img src={js} alt="javascript" className={styles.stack} />
          <img src={react} alt="React" className={styles.stack} />
          <img src={MongoDB} alt="MongoDB" className={styles.stack} />
          <img src={node} alt="node" className={styles.stack} />
          <img src={express} alt="express" className={styles.stack} />
          <img src={postman} alt="postman" className={styles.stack} />
          <img src={fonts} alt="Google Fonts" className={styles.stack} />
        </div>
      </section>

      <section className={styles.challengesSolutions}>
        <h2>Challenges & Solutions</h2>
        <p>
          One significant challenge during this project was implementing dynamic
          filtering of hotel listings based on various user-selected criteria,
          such as location, price range, and amenities. This required careful
          planning of the database schema and the design of efficient API
          queries to handle multiple filtering parameters simultaneously.
        </p>
        <p>
          To solve this, I implemented flexible query parameters in the back-end
          API built with Express.js. These parameters allowed the front-end to
          send various filtering options, which were then processed by the
          Node.js server. On the database side, I utilized MongoDB's querying
          capabilities, including the use of logical operators and indexing on
          frequently filtered fields, to ensure that the database could
          efficiently retrieve the relevant data even with a large number of
          hotel listings. This approach resulted in a responsive and
          user-friendly filtering experience.
        </p>
        <p>
          Another challenge involved managing user authentication and ensuring
          the security of user data. Implementing a secure and scalable
          authentication system was crucial.
        </p>
        <p>
          The solution was to implement JSON Web Tokens (JWT) for user
          authentication. When a user logs in, the server issues a JWT, which is
          then stored on the client-side. Subsequent requests from the client
          include this token in the headers, allowing the server to verify the
          user's identity without relying on session cookies. This stateless
          approach enhances scalability and simplifies the back-end.
          Additionally, best practices for password hashing and data
          sanitization were followed to protect user credentials and prevent
          common security vulnerabilities.
        </p>
      </section>

      <section className={styles.contactMe}>
        <h2>Contact Me</h2>
        <p>
          Thank you for your interest in this project! If you have any
          questions, feedback, or would like to connect, please feel free to
          reach out through the following channels:
        </p>
        <ul className={styles.contactList}>
          <li>
            LinkedIn:{" "}
            <a
              href="www.linkedin.com/in/dhawan-singh-saini"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/dhawan-singh-saini
            </a>
          </li>
        </ul>
        <p>
          I'm always open to discussing new opportunities and collaborations.
          Looking forward to hearing from you!
        </p>
      </section>
    </div>
  );
}

export default About;
