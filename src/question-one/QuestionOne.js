import React, { useState } from 'react';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import TopBarProgress from 'react-topbar-progress-indicator';

import './QuestionOne.scss';

const TableItem = ({ item, no }) => (
  <div className="record p-3 align-items-center">
    <div className="w-10">
      <span className="font-weight-bold">#</span>
      <div>{no}</div>
    </div>
    <div className="w-30 text-capitalize">
      <span className="font-weight-bold">Name</span>
      <div>{item.name}</div>
    </div>
    <div className="w-20">
      <span className="font-weight-bold">Start Date</span>
      <div>{new Date(item.start).toLocaleDateString()}</div>
    </div>
    <div className="w-20">
      <span className="font-weight-bold">End Date</span>
      <div>{new Date(item.end).toLocaleDateString()}</div>
    </div>
    <div className="w-20">
      <span className="font-weight-bold">Contact</span>
      <div>{item.contact.name}</div>
    </div>
  </div>
);

export const QuestionOne = ({ service }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const search = (keyword) => {
    if (!keyword) {
      setData([]);

      return;
    }

    if (keyword.length >= 3) {
      setLoading(true);

      service
        .getJobsWithSearchTerm(keyword)
        .then((res) => {
          setData(res);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <form>
          <h3 className="text-center mb-5">Search Jobs</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                search(e.target.value);
              }}
              id="searchInput"
              aria-describedby="search"
              placeholder="Type to search..."
            />
          </div>
        </form>
        {loading ? (
          <TopBarProgress />
        ) : (
          <section className="search-results">
            <div className="results-table mt-0">
              {data && data.length > 0 && (
                <div className="record p-3">
                  <div className="w-10">#</div>
                  <div className="w-30 header">Name</div>
                  <div className="w-20 header">Start Date</div>
                  <div className="w-20 header">End Date</div>
                  <div className="w-20 header">Contact</div>
                </div>
              )}
              {data.map((item, i) => (
                <TableItem
                  no={i + 1}
                  key={item.name + item.contact && item.contact.id}
                  item={item}
                />
              ))}
            </div>
            {keyword && keyword.length >= 3 && data && data.length === 0 && (
              <p>No jobs found</p>
            )}
          </section>
        )}
      </SectionPanel>
    </SectionGroup>
  );
};
