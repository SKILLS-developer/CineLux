export default function PlanCard({
  selectedInterval,
  handlePlan,
  planName,
  price,
  planCode,
  videoQuality,
  maxStreams,
}) {
  const isBasic = planName.includes("Basic");
  const isPremium = planName.includes("Premium");
  const isStandard = !isBasic && !isPremium;

  const features = [
    isBasic
      ? "Access to basic features"
      : isPremium
        ? "Access to all features"
        : "Access to standard features",
    isBasic
      ? "Limited support"
      : isPremium
        ? "Priority support"
        : "Standard support",
    `Video quality: ${videoQuality || "Standard"}`,
    `Max streams: ${maxStreams || 1}`,
    isBasic ? "No offline downloads" : "Offline downloads",
    isPremium ? "Multiple profiles" : "Single profile",
    isBasic ? "Ads supported" : "No ads",
    isPremium ? "Access to exclusive content" : "Access to regular content",
  ];

  return (
    <div
      className={`plan-card ${selectedInterval}${isStandard ? " most-popular" : ""}`}
    >
      <h2>{planName.split(" ")[0]}</h2>
      <p>
        ${price}/{selectedInterval}
      </p>
      <ul>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <button onClick={() => handlePlan(planCode)}>Get Started</button>
    </div>
  );
}
