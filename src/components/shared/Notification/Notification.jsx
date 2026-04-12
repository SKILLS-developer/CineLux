import "./Notification.css";
import {Link} from "react-router-dom";
import { FiX } from "react-icons/fi";
function NotificationModal({
  onClose,
  title,
  message,
  note,
  actionLabel,
  path,
}) {
  return (
    <div className="notification-backdrop" onClick={onClose}>
      <div
        className="notification"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="notification-close-btn"
          aria-label="Close notification"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h3 className="notification-title">{title}</h3>
        <p className="notification-message">{message}</p>
        {note ? <p className="notification-note">{note}</p> : null}
        <Link
          to={path}
          className="notification-action-btn notification-action-btn--full-width"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

export function LoginNotification({
  onClose,
  title = "Sign In Required",
  message = "You should sign in before selecting a plan.",
  note = "Your selected plan and billing option will be saved after login.",
  actionLabel = "Login",
  path = "/login",
}) {
  return (
    <NotificationModal
      onClose={onClose}
      title={title}
      message={message}
      note={note}
      actionLabel={actionLabel}
      path={path}
    />
  );
}

export function SubscriptionNotification({
  onClose,
  title = "Subscription Needed",
  message = "You need an active subscription to continue.",
  note = "Choose a plan to unlock full access to premium content.",
  actionLabel = "Subscribe",
  path = "/plans",
}) {
  return (
    <NotificationModal
      onClose={onClose}
      title={title}
      message={message}
      note={note}
      actionLabel={actionLabel}
      path={path}
    />
  );
}
