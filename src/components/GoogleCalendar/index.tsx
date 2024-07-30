import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  process.env.AUTH_REDIRECT_URI
);
const GoogleCalendar = () => {
  return <div>GoogleCalendar</div>;
};

export default GoogleCalendar;
