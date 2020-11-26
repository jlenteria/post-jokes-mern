/* eslint-disable import/no-anonymous-default-export */

import {
  EDUCATION_FORM,
  EDUCATION_MODAL,
  EXPERIENCE_FORM,
  EXPERIENCE_MODAL,
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  PROFILE_FORM,
} from '../types';

const initialState = {
  showProfile: true,
  showEducation: false,
  showExperience: false,
  educationModal: false,
  experienceModal: false,
  profiles: [],
  profileById: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_FORM:
      return {
        ...state,
        showProfile: true,
        showEducation: false,
        showExperience: false,
      };

    case EDUCATION_FORM:
      return {
        ...state,
        showProfile: false,
        showEducation: true,
        showExperience: false,
      };

    case EXPERIENCE_FORM:
      return {
        ...state,
        showProfile: false,
        showEducation: false,
        showExperience: true,
      };

    case GET_PROFILE:
      return {
        ...state,
        profiles: action.payload,
        experienceModal: false,
        educationModal: false,
      };
    case EDUCATION_MODAL:
      return {
        ...state,
        educationModal: true,
      };
    case EXPERIENCE_MODAL:
      return {
        ...state,
        experienceModal: true,
      };

    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profileById: action.payload,
      };

    default:
      return state;
  }
}
