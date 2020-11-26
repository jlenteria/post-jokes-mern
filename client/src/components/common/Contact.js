import React from 'react';

const Contact = () => {
  return (
    <div
      className="card mx-auto"
      style={{
        background: 'white',
        width: '50%',
        border: '1px solid rgba(0,0,0,0.16)',
        marginBottom: 100,
        paddingBottom: 50,
      }}
    >
      <article className="card-body mx-auto" style={{ width: '80%' }}>
        <h4 className="card-title mt-3 text-center">Contact Me</h4>
        <p className="text-center text-muted" style={{ marginTop: -5 }}>
          Send me a Message
        </p>
        <hr />
        <form className="form mt-5">
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-user" style={{ fontSize: 25 }}></i>
              </span>
            </div>
            <input
              name="contactName"
              className="form-control"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input
              name="contactEmail"
              className="form-control"
              placeholder="Email address"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Subject"
              type="text"
              name="contactSubjet"
            />
          </div>

          <div className="form-group input-group">
            <textarea
              rows="5"
              cols="5"
              className="form-control"
              placeholder="Enter your message here ..."
              type="text"
              name="contactMessage"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-block">
              Send
            </button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default Contact;
