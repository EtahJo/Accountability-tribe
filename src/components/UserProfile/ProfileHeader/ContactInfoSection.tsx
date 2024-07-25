interface ContactInfoSectionProps {
  title: string;
  detail: string | null;
}

const ContactInfoSection = ({ title, detail }: ContactInfoSectionProps) => {
  return (
    <span className="flex items-center">
      <p className="text-white mr-1.5">{title}</p>
      <p className="text-lightPink">{detail}</p>
    </span>
  );
};

export default ContactInfoSection;
