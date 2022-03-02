import React from "react";
import About from "./About";
import Contact from "./Contact";
import Service from "./Service";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <h1 className="display-4 fw-bolder mb-4 text-center text-white ">
                Feels the Fresh Business Perspective
              </h1>
              <p className="lead text-center fs-4 mb-5 text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <div className="buttons ">
                <Link
                  className="btn btn-light me-4 rounded-pill px-4 py-2"
                  to="/contact"
                >
                  Get Quote
                </Link>
                <Link
                  className="btn btn-outline-light rounded-pill px-4 py-2"
                  to="/service"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Service />
      <Contact />
    </div>
  );
}

export default Home;
