// src/components/OneActivityGroupPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OneActivityGroupPage = () => {
  const { activity_id } = useParams();
  const [activityGroup, setActivityGroup] = useState(null);

  useEffect(() => {
    const fetchActivityGroup = async () => {
      try {
        const response = await axios.get(
          `https://todo-list-api-eta.vercel.app/activity-groups/${activity_id}`
        );
        setActivityGroup(response.data.data);
      } catch (error) {
        console.error('Error fetching activity group:', error);
      }
    };

    fetchActivityGroup(); // Call the function inside useEffect

    // Since fetchActivityGroup is used inside useEffect, include it in the dependency array
  }, [activity_id]);

  if (!activityGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>{activityGroup.title}</h1>
      <div className='border border-gray-300 rounded-md p-4'>
        <p>ID: {activityGroup.id}</p>
        <p>Email: {activityGroup.email}</p>
      </div>
    </div>
  );
};

export default OneActivityGroupPage;
