import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityGroupsPage = () => {
  const [activityGroups, setActivityGroups] = useState([]);

  useEffect(() => {
    fetchActivityGroups();
  }, []);

  const fetchActivityGroups = async () => {
    try {
      const response = await axios.get(
        'https://todo-list-api-eta.vercel.app/activity-groups'
      );
      setActivityGroups(response.data.data);
    } catch (error) {
      console.error('Error fetching activity groups:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Activity Groups</h1>
      <div className='mt-4'>
        <h2 className='text-xl font-bold mb-2'>Activity Group List</h2>
        {activityGroups.map((activityGroup) => (
          <div
            key={activityGroup.id}
            className='border border-gray-300 rounded-md p-4 mb-4'
          >
            <h3 className='font-bold'>{activityGroup.title}</h3>
            <p>ID: {activityGroup.id}</p>
            <p>Email: {activityGroup.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGroupsPage;
