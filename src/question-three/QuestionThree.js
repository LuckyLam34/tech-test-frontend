import React from 'react';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

import './QuestionThree.scss';

const Card = (props) => {
  return <div className="card"></div>;
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

const ColumnLeft = () => (
  <div className="column-left">
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
);

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
          <ColumnLeft />
          <ColumnRight />
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
