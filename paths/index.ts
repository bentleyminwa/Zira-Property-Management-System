export const dashboardPath = `/dashboard`;
export const bookingsPath = `${dashboardPath}/bookings`;
export const tenantsPath = `${dashboardPath}/tenants`;
export const propertiesPath = `${dashboardPath}/properties`;
export const maintenancePath = `${dashboardPath}/maintenance`;
export const settingsPath = `${dashboardPath}/settings`;

export const bookingDetailsPath = (id: string) =>
  `${dashboardPath}/bookings/${id}`;
export const tenantDetailsPath = (id: string) =>
  `${dashboardPath}/tenants/${id}`;
export const propertyDetailsPath = (id: string) =>
  `${dashboardPath}/properties/${id}`;
export const maintenanceDetailsPath = (id: string) =>
  `${dashboardPath}/maintenance/${id}`;
export const paymentDetailsPath = (id: string) =>
  `${dashboardPath}/payments/${id}`;
