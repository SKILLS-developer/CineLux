export default function PlanCard({
  selectedInterval,
  handlePlan,
  planName,
  price,
  planCode,
  videoQuality,
  maxStreams,
}) {
  const featureList = [
    planName.includes("Basic") ? "Access to basic features" : planName.includes("Premium") ? "Access to all features" : "Access to standard features",
    planName.includes("Basic") ? "Limited support" : planName.includes("Premium") ? "Priority support" : "Standard support",
    `Video quality: ${videoQuality || "Standard"}`,
    `Max streams: ${maxStreams || 1}`,
    planName.includes("Premium") || planName.includes("Standard") ? "Offline downloads" : "No offline downloads",
    planName.includes("Premium") ? "Multiple profiles" : "Single profile",
    planName.includes("Premium") || planName.includes("Standard") ? "No ads" : "Ads supported",
    planName.includes("Premium") ? "Access to exclusive content" : "Access to regular content",
  ];
  return (
    <div className={`plan-card ${selectedInterval} ${planName.includes("Standard") ? "most-popular" : ""}`}>
      <h2>{planName.split(" ")[0]}</h2>

      <p>
        ${price}/{selectedInterval}
      </p>
      <ul>
        {featureList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={() => handlePlan(planCode)}>Get Started</button>
    </div>
  );
}
