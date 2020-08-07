import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
});

const axiosClient = Axios.create({
  baseURL: 'http://localhost:3400',
});

const get = (endpoint) => {
  return axiosClient
    .get(endpoint)
    .then((result) =>
      result.data.map((x) => Object.assign({}, x, { id: x.id + '' }))
    );
};

export const DataService = {
  getJobsWithSearchTerm: (searchTerm) => {
    return graphClient
      .query({
        query: gql`
          query($searchTerm: String) {
            jobs(name: $searchTerm) {
              name
              start
              end
              contact {
                id
                name
              }
            }
          }
        `,
        variables: {
          searchTerm: searchTerm,
        },
      })
      .then((result) => result.data)
      .then((data) => data.jobs);
  },

  getJobs: () => {
    return get('/jobs');
  },
  getResources: () => {
    return get('/resources');
  },

  getActivities: () => {
    return get('/activities');
  },

  getJobAllocations: () => {
    return get('/jobAllocations');
  },

  getActivityAllocations: () => {
    return get('/activityAllocations');
  },
};
