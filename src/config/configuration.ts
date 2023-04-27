export default () => ({
  service: "ffc-main-service",
  issuer: "http://localhost:3000" ?? process.env.ISSUER,
  authorizedServices: ["ffc-analytics-service", "ffc-auth-service", "ffc-main-service", "ffc-notifications-service", "ffc-payments-service"],
});