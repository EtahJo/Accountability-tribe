import {
  FaBell,
  FaExclamationCircle,
  FaCheckCircle,
  FaTasks,
  FaSync,
  FaHourglassEnd,
  FaStopwatch,
} from 'react-icons/fa';
import NavbarIcon from '@/components/NavbarIcon';
import NavbarItem from '@/components/ProfileIconItem/index';
import { update_notification } from '@/action/notification/update';
import { Notification } from '@prisma/client';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface NotificationIconProps {
  notifications: Notification[];
}
const NotificationIcon = ({ notifications }: NotificationIconProps) => {
  const unReadNotifications = notifications.filter(
    (notification) => !notification.read
  );
  const onNotificationClick = (notificationId: string) => {
    update_notification(notificationId);
  };

  return (
    <div>
      <NavbarIcon
        trigger={
          <NavbarItem
            icon={<FaBell size={25} className="text-white text-shadow-lg" />}
            number={
              unReadNotifications.length !== 0
                ? unReadNotifications.length
                : null
            }
          />
        }
      >
        {notifications?.map((notification) => (
          <DropdownMenuItem
            className="w-max whitespace-nowrap cursor-pointer"
            onClick={() => onNotificationClick(notification.id)}
          >
            <div className="flex items-center gap-2 text-lightPink group">
              {notification.type === 'WARNING' && <FaExclamationCircle />}
              {notification.type === 'APPROVAL' && <FaCheckCircle />}
              {notification.type === 'ADMINTASK' && <FaTasks />}
              {notification.type === 'SESSIONUPDATES' && <FaSync />}
              {notification.type === 'DEADLINES' && <FaHourglassEnd />}
              {notification.type === 'SESSIONSTART' && <FaStopwatch />}
              <p
                className={cn(
                  'text-black group-hover:text-purple',
                  notification.read ? 'font-normal' : 'font-bold'
                )}
              >
                {' '}
                {notification.message}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </NavbarIcon>
    </div>
  );
};

export default NotificationIcon;
