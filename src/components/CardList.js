import React from 'react';

import Card from './Card';

const CardList = ({ robots }) => {
  // if (true) throw new Error('No');
  const cardArray = robots.map((user, i) => {
    return (
      <Card
        key={user.id}
        id={robots[i].id}
        name={robots[i].name}
        email={robots[i].email}
      />
    );
  });
  return <div>{cardArray}</div>;
};

export default CardList;
