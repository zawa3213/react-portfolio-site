import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer'
import { requestStates } from '../constants';
import { useSkills } from '../customHooks/useSkills';

export const Skills = () => {
  const [sortedLanguageList, fetchRequestState, converseCountToPercentage] = useSkills();

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            fetchRequestState === requestStates.success && (
              sortedLanguageList().map((item, index) => (
                <div key={index}>
                  <p className="description"><strong>{item.language}</strong></p>
                  <CircularProgressbar value={converseCountToPercentage(item.count)} text={`${converseCountToPercentage(item.count)}%`} />
                </div>
              ))
            )
          }
          {
            fetchRequestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};
