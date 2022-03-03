import { useState } from "react";

function Contact() {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setMsg({ ...msg, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = msg;
    try {
      const res = await fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (res.status === 400 || !res) {
        window.alert("Message Not Sent ");
      } else {
        window.alert("Message  Sent");
        setMsg({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5 ">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b>Question</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://www.clearswift.com/sites/default/files/2021-09/hs-contact-us-figure.png"
                alt="Contact"
                className="w-75"
              />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} method="POSt">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Du"
                    name="name"
                    value={msg.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    name="message"
                    value={msg.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  Send Message <i className="fa fa-paper-plane ms-2 "></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
