import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import "./MonsterNav.css";

const MonsterNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const monsters = useStore(state => state.monsters) || [];

  // Filter monsters for the current user
  const userMonsters = monsters.filter(monster => Number(monster.user_id) === user.id);
  
  const currentId = +id;
  const currentIndex = userMonsters.findIndex(monster => monster.id === currentId);
  
  // If monster not found or no monsters, don't render navigation
  if (currentIndex === -1 || userMonsters.length <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/monster/${userMonsters[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < userMonsters.length - 1) {
      navigate(`/monster/${userMonsters[currentIndex + 1].id}`);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === userMonsters.length - 1;

  return (
    <>
      {!isFirst && (
        <button 
          className="arrow back" 
          onClick={handlePrev}
          title="Previous Monster"
        >
          &#8592;
        </button>
      )}
      {!isLast && (
        <button 
          className="arrow next" 
          onClick={handleNext}
          title="Next Monster"
        >
          &#8594;
        </button>
      )}
    </>
  );
};

export default MonsterNavigation;
