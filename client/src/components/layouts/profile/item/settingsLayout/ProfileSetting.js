/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addUserSettings,
  updateBasicSettings,
  updateLinksSettings,
  getCurrentProfile,
} from "../../../../../redux/actions/ProfileAction";
import isEmpty from "../../../../../validation/is-empty";

const ProfileSetting = () => {
  const [state, setState] = useState({
    username: "",
    birthdate: "",
    firstname: "",
    lastname: "",
    contactnumber: "",
    gender: "",
    status: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    github: "",
    email: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",

    userHasError: false,
    basicHasError: false,
    linksHasError: false,
  });

  const {
    username,
    birthdate,
    firstname,
    lastname,
    contactnumber,
    gender,
    status,
    website,
    location,
    skills,
    bio,
    github,
    email,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    userHasError,
    basicHasError,
    linksHasError,
  } = state;

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profile = useSelector((state) => state.profiles);
  const auth = useSelector((state) => state.auth);
  const { error } = errors;
  const { profiles } = profile;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    errors.error = "";
  });

  useEffect(() => {
    //If profile field doesn't exist, make empty string
    if (profiles.youtube !== undefined || profiles.bio !== undefined) {
      var skill = "";
      if (profiles.skills !== undefined) {
        skill = profiles.skills.join(",");
      }
      profiles.location = !isEmpty(profiles.location) ? profiles.location : "";
      profiles.bio = !isEmpty(profiles.bio) ? profiles.bio : "";
      profiles.email = !isEmpty(profiles.email) ? profiles.email : "";
      profiles.status = !isEmpty(profiles.status) ? profiles.status : "";
      profiles.gender = !isEmpty(profiles.gender) ? profiles.gender : "";
      profiles.birthdate = !isEmpty(profiles.birthdate)
        ? profiles.birthdate
        : "";
      profiles.contactnumber = !isEmpty(profiles.contactnumber)
        ? profiles.contactnumber
        : "";

      profiles.social = !isEmpty(profiles.social) ? profiles.social : {};
      profiles.twitter = !isEmpty(profiles.social.twitter)
        ? profiles.social.twitter
        : "";
      profiles.facebook = !isEmpty(profiles.social.facebook)
        ? profiles.social.facebook
        : "";
      profiles.linkedin = !isEmpty(profiles.social.linkedin)
        ? profiles.social.linkedin
        : "";
      profiles.youtube = !isEmpty(profiles.social.youtube)
        ? profiles.social.youtube
        : "";
      profiles.instagram = !isEmpty(profiles.social.instagram)
        ? profiles.social.instagram
        : "";
      profiles.website = !isEmpty(profiles.social.website)
        ? profiles.social.website
        : "";
      profiles.github = !isEmpty(profiles.social.github)
        ? profiles.social.github
        : "";
      setState({
        ...state,
        firstname: profiles.firstname,
        lastname: profiles.lastname,
        email: auth.user.email,
        username: profiles.username,
        birthdate: profiles.birthdate,
        contactnumber: profiles.contactnumber,
        gender: profiles.gender,
        status: profiles.status,
        website: profiles.website,
        location: profiles.location,
        skills: skill,
        bio: profiles.bio,
        github: profiles.github,
        facebook: profiles.facebook,
        youtube: profiles.youtube,
        twitter: profiles.twitter,
        linkedin: profiles.linkedin,
        instagram: profiles.instagram,
      });
    } else {
      setState({
        ...state,
        firstname: auth.user.firstName,
        lastname: auth.user.lastName,
        email: auth.user.email,
      });
    }
  }, [profiles, auth.user.firstName, auth.user.lastName, auth.user.email]);

  const handleChange = (text) => (e) => {
    setState({
      ...state,
      [text]: e.target.value,
      userHasError: false,
      basicHasError: false,
      linksHasError: false,
    });
  };
  const userHandleUpdate = (e) => {
    e.preventDefault();

    if (
      firstname !== "" &&
      lastname !== "" &&
      username !== "" &&
      username !== undefined
    ) {
      const data = {
        firstname,
        lastname,
        username,
        email,
      };

      dispatch(addUserSettings(data));
    } else {
      setState({
        ...state,
        basicHasError: false,
        userHasError: true,
        linksHasError: false,
      });
    }
  };

  const basicHandleUpdate = (e) => {
    e.preventDefault();
    if (
      bio !== "" &&
      gender !== "" &&
      status !== "" &&
      contactnumber !== "" &&
      location !== "" &&
      skills !== "" &&
      birthdate !== ""
    ) {
      const data = {
        bio,
        gender,
        contactnumber,
        location,
        skills,
        birthdate,
        status,
      };

      dispatch(updateBasicSettings(data));
    } else {
      setState({
        ...state,
        basicHasError: true,
        userHasError: false,
        linksHasError: false,
      });
    }
  };

  const linksHandleUpdate = (e) => {
    e.preventDefault();

    if (
      youtube !== "" &&
      twitter !== "" &&
      facebook !== "" &&
      linkedin !== "" &&
      instagram !== "" &&
      website !== "" &&
      github !== ""
    ) {
      const data = {
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        website,
        github,
      };

      dispatch(updateLinksSettings(data));
    } else {
      setState({
        ...state,
        basicHasError: false,
        userHasError: false,
        linksHasError: true,
      });
    }
  };

  return (
    <div className="w-100 d-block profile-setting mb-4 ml-2">
      <div className="d-block bg-white p-4 mb-4 user">
        <h5 className="mb-4" style={{ fontWeight: "bold" }}>
          User
        </h5>
        <div className="d-flex">
          <div className="form-group w-50 mr-3">
            <label className="text-dark">Firstname</label>
            <input
              className="form-control"
              name="firstname"
              value={firstname || ""}
              onChange={handleChange("firstname")}
            />
          </div>
          <div className="form-group w-50">
            <label className="text-dark">Lastname</label>
            <input
              className="form-control"
              name="lastname"
              value={lastname || ""}
              onChange={handleChange("lastname")}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="text-dark">Email</label>
          <input
            disabled
            type="email"
            name="email"
            placeholder="Email Address"
            className="form-control"
            value={email || ""}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control"
            value={username || ""}
            onChange={handleChange("username")}
          />
        </div>
        {userHasError ? (
          <p className="alert alert-danger">Please fill out all fields</p>
        ) : (
          ""
        )}
        <span>
          <button className="btn btn-primary mt-3" onClick={userHandleUpdate}>
            Save
          </button>
        </span>
      </div>
      <div className="d-block bg-white p-4 mb-4 basic">
        <h5 className="mb-4" style={{ fontWeight: "bold" }}>
          Basic
        </h5>
        <div className="form-group">
          <label className="text-dark">Bio</label>
          <textarea
            rows="3"
            cols="3"
            name="bio"
            placeholder="Your short bio"
            className="form-control"
            value={bio || ""}
            onChange={handleChange("bio")}
          />
        </div>
        <div className="d-flex">
          <div className="form-group w-50 mr-4">
            <label className="text-dark">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={gender || ""}
              onChange={handleChange("gender")}
            >
              <option>---</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group w-50">
            <label className="text-dark">Status</label>
            <select
              className="form-control"
              name="status"
              value={status || ""}
              onChange={handleChange("status")}
            >
              <option value="">---</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="text-dark">Contact No.</label>
          <input
            type="text"
            name="contactnumber"
            placeholder="09094878094"
            className="form-control"
            value={contactnumber || ""}
            onChange={handleChange("contactnumber")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Your location"
            className="form-control"
            value={location || ""}
            onChange={handleChange("location")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Your skills"
            className="form-control"
            value={skills || ""}
            onChange={handleChange("skills")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Birthdate</label>
          <input
            type="date"
            name="birthdate"
            min="1980-01-01"
            max="2020-01-01"
            className="form-control"
            value={birthdate || ""}
            onChange={handleChange("birthdate")}
          />
        </div>
        {basicHasError ? (
          <p className="alert alert-danger">Please fill out all fields</p>
        ) : (
          ""
        )}
        <div>
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={basicHandleUpdate}
          >
            Save
          </button>
        </div>
      </div>
      <div className="d-block bg-white p-4 links">
        <h5 className="mb-4" style={{ fontWeight: "bold" }}>
          Links
        </h5>
        <div className="form-group">
          <label className="text-dark">Website</label>
          <input
            type="text"
            name="website"
            placeholder="www.website.com"
            className="form-control"
            value={website || ""}
            onChange={handleChange("website")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Github</label>
          <input
            type="text"
            name="github"
            placeholder="www.github.com/sample"
            className="form-control"
            value={github || ""}
            onChange={handleChange("github")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Youtube</label>
          <input
            type="text"
            name="youtube"
            placeholder="www.youtube.com/sample"
            className="form-control"
            value={youtube || ""}
            onChange={handleChange("youtube")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder="www.twitter.com/sample"
            className="form-control"
            value={twitter || ""}
            onChange={handleChange("twitter")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="www.facebook.com/sample"
            className="form-control"
            value={facebook || ""}
            onChange={handleChange("facebook")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Linkedin</label>
          <input
            type="text"
            name="linkedin"
            placeholder="www.linkedin.com/sample"
            className="form-control"
            value={linkedin || ""}
            onChange={handleChange("linkedin")}
          />
        </div>
        <div className="form-group">
          <label className="text-dark">Instagram</label>
          <input
            type="text"
            name="instagram"
            placeholder="www.instagram.com/sample"
            className="form-control"
            value={instagram || ""}
            onChange={handleChange("instagram")}
          />
        </div>
        {linksHasError ? (
          <p className="alert alert-danger">Please fill out all fields</p>
        ) : (
          ""
        )}
        <div>
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={linksHandleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
