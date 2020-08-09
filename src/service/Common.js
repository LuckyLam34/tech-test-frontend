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

const requestData = async (service) => {
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
      JobAllocations,
      activityAllocations,
    ] = res;

    data = { jobs, resources, activities, JobAllocations, activityAllocations };
  } catch (e) {}

  return data;
};

export const getQuestion2Data = (service) => {
  return new Promise(async (resolve, reject) => {
    let data = [];

    const res = await requestData(service);

    if (!res) {
      reject({ msg: 'Errors encountered!' });

      return;
    }

    let {
      jobs,
      resources,
      activities,
      JobAllocations,
      activityAllocations,
    } = res;

    const jobsObj = arrayToObj('id', jobs);
    const resourcesObj = arrayToObj('id', resources);
    const activitiesObj = arrayToObj('id', activities);

    const JobAllocationsObj = {};
    JobAllocations.forEach((item) => {
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
