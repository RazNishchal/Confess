import React from "react";
import useTitle from "../hooks/useTitle";

const Aboutus = () => {
  useTitle("About us | Confess Note");

  return (
    <div className="about-container">
      <style>
        {`
          .about-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 85vh;
            padding: 20px;
            text-align: center;
            max-width: 1200px;
            margin: 0 auto;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .about-card {
            background: #ffffff;
            padding: 40px 20px;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.06);
            width: 100%;
            max-width: 550px;
          }

          .myphoto img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #6c63ff;
            padding: 4px;
            margin-bottom: 20px;
          }

          h2 {
            font-size: 2.2rem;
            margin-bottom: 12px;
            color: #1a1a1a;
          }

          .about-text {
            font-size: 1.05rem;
            line-height: 1.7;
            color: #444;
            margin-bottom: 30px;
          }

          /* Button Container for Responsiveness */
          .links-wrapper {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap; /* Allows stacking on mobile */
          }

          .social-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-size: 0.95rem;
          }

          /* GitHub Style */
          .github {
            background-color: #24292e;
            color: white;
          }

          .github:hover {
            background-color: #000;
            transform: translateY(-3px);
          }

          /* LinkedIn Style */
          .linkedin {
            background-color: #0077b5;
            color: white;
          }

          .linkedin:hover {
            background-color: #005a87;
            transform: translateY(-3px);
          }

          @media (max-width: 480px) {
            .about-card { padding: 30px 15px; }
            h2 { font-size: 1.8rem; }
            .links-wrapper { flex-direction: column; width: 100%; }
            .social-link { justify-content: center; }
          }
        `}
      </style>

      <div className="about-card">
        <div className="myphoto">
          <img src="nishchal.jpg" alt="Nishchal" />
        </div>
        
        <h2>About us</h2>
        
        <p className="about-text">
          Confess Note is a public forum where you can confess your ideas,
          opinions, or thoughts about anything. To maintain a fresh and safe
          environment, all confessions made will be <strong>deleted after 24 hours.</strong>
        </p>

        <div className="links-wrapper">
          {/* GitHub Link */}
          <a 
            href="https://github.com/RazNishchal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link github"
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            GitHub
          </a>

          {/* LinkedIn Link */}
          <a 
            href="https://www.linkedin.com/in/nishchal-raj-subedi-7174bb244/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link linkedin"
          >
            <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
