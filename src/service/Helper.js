const arrayToObj = (keyName, arr) => {
  const obj = {};

  arr.forEach((item) => {
    obj[item[keyName]] = item;
  });

  return obj;
};

const transformToUIDisplayData = (arr) => {
  arr.forEach((item) => {
    item.activities = item.activities.map((activity) => ({
      ...activity,
      start: new Date(activity.start),
      end: new Date(activity.end),
      name: `${new Date(activity.start).toDateString()} - ${new Date(
        activity.end
      ).toDateString()}: ${activity.name}`,
      className: 'custom',
    }));
  });

  return arr;
};

const bindResourcesWithJobsAndActivities = (
  resources,
  JobAllocationsObj,
  activityAllocationsObj
) => {
  resources.forEach((item) => {
    item.job =
      JobAllocationsObj[item.id] && JobAllocationsObj[item.id].job
        ? JobAllocationsObj[item.id].job
        : {};

    if (
      activityAllocationsObj[item.id] &&
      activityAllocationsObj[item.id].activity
    ) {
      if (!item.activities) {
        item.activities = [];
      }
      item.activities.push(activityAllocationsObj[item.id].activity);
    } else {
      item.activities = [];
    }
  });

  return resources;
};

const fetchQuestion2Data = async (service) => {
  let res, data;

  try {
    res = await Promise.all([
      service.getJobs(),
      service.getResources(),
      service.getActivities(),
      service.getJobAllocations(),
      service.getActivityAllocations(),
    ]);

    const [
      jobs,
      resources,
      activities,
      jobAllocations,
      activityAllocations,
    ] = res;

    data = { jobs, resources, activities, jobAllocations, activityAllocations };
  } catch (e) {}

  return data;
};

const fetchQuestion3Data = async (service) => {
  let res, data;

  try {
    res = await Promise.all([service.getJobs(), service.getJobAllocations()]);

    const [jobs, jobAllocations] = res;

    data = { jobs, jobAllocations };
  } catch (e) {}

  return data;
};

export const getQuestion2Data = (service) => {
  return new Promise(async (resolve, reject) => {
    let data = [];

    const res = await fetchQuestion2Data(service);

    if (!res) {
      reject({ msg: 'Errors encountered!' });

      return;
    }

    const {
      jobs,
      resources,
      activities,
      jobAllocations,
      activityAllocations,
    } = res;

    const jobsObj = arrayToObj('id', jobs);
    const resourcesObj = arrayToObj('id', resources);
    const activitiesObj = arrayToObj('id', activities);

    const JobAllocationsObj = {};
    jobAllocations.forEach((item) => {
      JobAllocationsObj[resourcesObj[item.resourceId].id] = {
        job: jobsObj[item.jobId],
      };
    });

    const activityAllocationsObj = {};
    activityAllocations.forEach((item) => {
      activityAllocationsObj[resourcesObj[item.resourceId].id] = {
        activity: activitiesObj[item.activityId],
      };
    });

    data = bindResourcesWithJobsAndActivities(
      resources,
      JobAllocationsObj,
      activityAllocationsObj
    );

    data = transformToUIDisplayData(data);

    resolve(data);
  });
};

const countJobAllocations = (jobs, jobAllocations) => {
  const allocatedJobIds = jobAllocations.map((item) => item.jobId);

  const data = jobs.map((item) => {
    const count = allocatedJobIds.filter((jobId) => jobId == item.id).length;

    return {
      ...item,
      count,
    };
  });

  return data;
};

const transformQuestion3DataToUIDisplay = (data) => {
  const dateFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  data.forEach((item) => {
    const start = new Date(item.start);
    const end = new Date(item.end);

    item.start = start.toLocaleDateString('en-us', dateFormatOptions);
    item.time = `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
  });

  return data;
};

export const getQuestion3Data = async (service) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetchQuestion3Data(service);

    if (!res) {
      reject({ msg: 'Errors encountered!' });

      return;
    }

    const { jobs, jobAllocations } = res;

    let data = countJobAllocations(jobs, jobAllocations);
    data = transformQuestion3DataToUIDisplay(data);

    resolve(data);
  });
};
