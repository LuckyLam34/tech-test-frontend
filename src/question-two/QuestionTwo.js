import React, { useEffect, useState } from 'react';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';
import { Swimlane } from '../components/swimlane/Swimlane';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getQuestion2Data } from '../service/Helper';
import swal from 'sweetalert';

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z');
const RANGE_END = new Date('2018-09-01T24:00:00Z');

export const QuestionTwo = ({ service }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getQuestion2Data(service)
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
    <div>
      {loading ? (
        <TopBarProgress />
      ) : (
        <SectionGroup>
          <SectionPanel>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <Swimlane
                  start={RANGE_START}
                  end={RANGE_END}
                  key={item.id}
                  lanes={[
                    {
                      title: item.name,
                      cards: item.activities,
                    },
                  ]}
                />
              ))}
          </SectionPanel>
        </SectionGroup>
      )}
    </div>
  );
};
