import "./Notification.css";

export function LoginNotification() {
  return (
    <div className="notification">
      <button
        className="notification-close-btn"
        aria-label="Close notification"
      >
        ×
      </button>
      <p>You should Sign In First !</p>
      <button className="notification-action-btn">Login</button>
    </div>
  );
}
export function SubscriptionNotification() {
  return (
    <div className="notification">
      <button
        className="notification-close-btn"
        aria-label="Close notification"
      >
        ×
      </button>
      <p>You should subscribe first!</p>
      <button className="notification-action-btn">Subscribe</button>
    </div>
  );
}
