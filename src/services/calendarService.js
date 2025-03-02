export async function syncWithGoogleCalendar(eventDetails) {
  console.log('CalendarService: Starting sync...');
  
  // Simulate API delay
  console.log('CalendarService: Simulating API delay...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('CalendarService: Creating event with details:', {
    summary: eventDetails.title,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: `${eventDetails.startDate}T${eventDetails.startTime}:00`,
      timeZone: 'Africa/Casablanca'
    },
    end: {
      dateTime: `${eventDetails.endDate}T${eventDetails.endTime}:00`,
      timeZone: 'Africa/Casablanca'
    }
  });

  // Simulate successful sync
  console.log('CalendarService: Sync completed successfully');
  return true;
} 