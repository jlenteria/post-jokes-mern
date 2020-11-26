import React from 'react';
import pic from '../../assets/1-11r.jpg';

const About = () => {
  return (
    <div className="bg-white d-block about">
      <div>
        <img src={pic} alt="" />
        <h5 className="mt-2">Jonel T. Lenteria</h5>
        <p className="text-muted" style={{ marginTop: -5 }}>
          Web/Desktop Programmer/Joker
        </p>
        <hr />
        <div className="d-flex justify-content-start w-100 align-items-center">
          <i className="fa fa-map-marker fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Location:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Cebu City</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-birthday-cake fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Age:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">22</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-life-ring fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Status:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Single</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-cogs fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Skills:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">
            React, Node, Bootstrap,C#, .Net, SQL, Mongodb
          </p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-building fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Work:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Programmer at RD Pawnshop Inc PH</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-building fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Motto:</strong>{' '}
          </p>
          <p
            className="mt-4 ml-2"
            style={{ fontStyle: 'italic', fontSize: 15 }}
          >
            "No matter how hard or impossible it is, never lose sight of your
            goal"
          </p>
        </div>
        <hr />
        <h5 className="text-left mt-4" style={{ textDecoration: 'underline' }}>
          Elementary
        </h5>
        <div className="d-flex justify-content-start w-100 align-items-center">
          <i className="fa fa-building fa-2x text-muted"></i>
          <p className="mt-4 ml-2 text-muted">
            <strong>Name:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Concepcion Elementary School</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-map-marker fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Location:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Concepcion, Danao, Bohol</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-graduation-cap fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Graduated:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">March 2011</p>
        </div>
        <hr />
        <h5 className="text-left mt-4" style={{ textDecoration: 'underline' }}>
          Secondary
        </h5>
        <div className="d-flex justify-content-start w-100 align-items-center">
          <i className="fa fa-building fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Name:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Danao National High School</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-map-marker fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Location:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Poblacion, Danao, Bohol</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-graduation-cap fa-2x text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Graduated:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">March 2016</p>
        </div>
        <hr />
        <h5 className="text-left mt-4" style={{ textDecoration: 'underline' }}>
          College
        </h5>
        <div className="d-flex justify-content-start w-100 align-items-center">
          <i className="fa fa-building fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Name:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">University of Cebu - Banilad</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-map-marker fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Location:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">Banilad, Cebu City, Cebu</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-graduation-cap fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Degree:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">BS in Engineering</p>
        </div>
        <div
          className="d-flex justify-content-start w-100 align-items-center"
          style={{ marginTop: -20 }}
        >
          <i className="fa fa-graduation-cap fa-2x  text-muted"></i>
          <p className="mt-4 ml-2  text-muted">
            <strong>Graduated:</strong>{' '}
          </p>
          <p className="mt-4 ml-2">March 2020</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default About;
