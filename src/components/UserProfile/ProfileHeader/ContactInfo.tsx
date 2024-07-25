'use client';
import React from 'react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { format } from 'libphonenumber-js';
import { User } from '@prisma/client';
import ContactInfoSection from './ContactInfoSection';

countries.registerLocale(enLocale);
const ContactInfo = ({ user }: { user: User }) => {
  const phoneNumber = user?.number;
  const countryCode = user?.number?.split(',')[0].toUpperCase() as any;
  const countryName = countries.getName(user?.country as string, 'en');
  const formatedNumber = phoneNumber
    ? format(phoneNumber, countryCode, 'INTERNATIONAL')
    : '';
  return (
    <div>
      <ContactInfoSection title="Email:" detail={user?.email} />
      {user?.country && (
        <ContactInfoSection title="Country:" detail={countryName as any} />
      )}
      {user?.number && (
        <ContactInfoSection title="Phone Number:" detail={formatedNumber} />
      )}
    </div>
  );
};

export default ContactInfo;
