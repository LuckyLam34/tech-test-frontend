import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import TopBarProgress from 'react-topbar-progress-indicator';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { getQuestion3Data } from '../service/Helper';

import './QuestionThree.scss';

const Card = ({ name, no, location, start, time, count }) => {
  return (
    <div className="card">
      <h5 className="title">
        {name} {no && <span>(Job #{no})</span>}
      </h5>
      <p>{location}</p>
      <p>{start}</p>
      <p>{time}</p>
      {(count || count === 0) && <div className="count">{count}</div>}
    </div>
  );
};

const Header = ({ headerItems }) => {
  return (
    <nav>
      {headerItems.map((item) => (
        <a href="#" key={item}>
          {item}
        </a>
      ))}
    </nav>
  );
};

const SideBar = (props) => (
  <div className="sidebar">
    <div className="menu">
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
    </div>
  </div>
);

const ColumnLeft = ({ service }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getQuestion3Data(service)
      .then(
        (data) => {
          setItems(data);
        },
        (err) => {
          swal('Error!', err.msg, 'error', {
            button: false,
          });
        }
      )
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="column-left">
      {items.map((item, i) => (
        <Card key={item.id} {...item} no={i + 1} />
      ))}
      <div></div>
    </div>
  );
};

const ColumnRight = () => (
  <div className="column-right">
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <div></div>
  </div>
);

export const QuestionThree = (props) => {
  const headerItems = ['Home', 'About', 'Jobs', 'Contact'];

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="wrapper">
          <SideBar />
          <Header headerItems={headerItems} />
          <ColumnLeft {...props} />
          <ColumnRight />
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
