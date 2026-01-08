export const dashboardPath = `/dashboard`;
export const bookingsPath = `${dashboardPath}/bookings`;
export const tenantsPath = `${dashboardPath}/tenants`;
export const propertiesPath = `${dashboardPath}/properties`;
export const maintenancePath = `${dashboardPath}/maintenance`;
export const paymentsPath = `${dashboardPath}/payments`;
export const settingsPath = `${dashboardPath}/settings`;

export const bookingDetailsPath = (id: string) => `${bookingsPath}/${id}`;
export const tenantDetailsPath = (id: string) => `${tenantsPath}/${id}`;
export const propertyDetailsPath = (id: string) => `${propertiesPath}/${id}`;
export const maintenanceDetailsPath = (id: string) =>
  `${maintenancePath}/${id}`;
export const paymentDetailsPath = (id: string) => `${paymentsPath}/${id}`;
