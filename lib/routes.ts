/**
 * Application Routes Constants
 * Centralized route definitions for consistent navigation across the application
 */

// Authentication Routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

// Public Routes (for unauthenticated users)
export const PUBLIC_ROUTES = {
  LANDING: "/landing",
  HISTORY: "/history",
} as const;

// Dashboard Routes (now at root for authenticated users)
export const DASHBOARD_ROUTES = {
  HOME: "/",
  ACCOUNT: "/account",
  SETTINGS: "/settings",
  HELP: "/help",
} as const;

// Search Routes
export const SEARCH_ROUTES = {
  // Main search pages
  SEARCHES: "/searches/history",
  NEW_SEARCH: "/search/new",
  NEW_SIMPLE_SEARCH: "/search/new-simple",

  // Service-specific search pages
  PEOPLE: "/search/people",
  COMPANIES: "/search/companies",
  VEHICLES: "/search/vehicle",
  PHONES: "/search/phones",
  BANKS: "/search/banks",
  OSINT: "/search/osint",
  IDENTITY: "/search/identity",
} as const;

// Reports Routes
export const REPORT_ROUTES = {
  // Dynamic route - use REPORT_DETAIL(id) function instead
  DETAIL: (id: string | number) => `/reports/${id}`,
} as const;

// Search Management Routes
export const SEARCH_MANAGEMENT_ROUTES = {
  PURCHASE: "/searches/purchase",
  HISTORY: "/searches/history",
  PURCHASE_SUCCESS: "/searches/purchase/success",
  PURCHASE_FAILURE: "/searches/purchase/failure",
  PURCHASE_PENDING: "/searches/purchase/pending",
} as const;

// Navigation Groups for Sidebar/Menu
export const NAVIGATION_ROUTES = {
  MAIN: [
    { name: "Dashboard", href: DASHBOARD_ROUTES.HOME },
    { name: "Nueva Búsqueda", href: SEARCH_ROUTES.NEW_SEARCH },
  ],

  SERVICES: [
    { name: "Personas", href: SEARCH_ROUTES.PEOPLE },
    { name: "Empresas", href: SEARCH_ROUTES.COMPANIES },
    { name: "Vehículos", href: SEARCH_ROUTES.VEHICLES },
    { name: "Teléfonos", href: SEARCH_ROUTES.PHONES },
    { name: "Cuentas Bancarias", href: SEARCH_ROUTES.BANKS },
    { name: "OSINT", href: SEARCH_ROUTES.OSINT },
    { name: "Validación de Identidad", href: SEARCH_ROUTES.IDENTITY },
  ],

  ACCOUNT: [
    { name: "Mi Cuenta", href: DASHBOARD_ROUTES.ACCOUNT },
    { name: "Configuración", href: DASHBOARD_ROUTES.SETTINGS },
    { name: "Ayuda", href: DASHBOARD_ROUTES.HELP },
  ],

  SEARCH_MANAGEMENT: [
    { name: "Comprar Búsquedas", href: SEARCH_MANAGEMENT_ROUTES.PURCHASE },
    { name: "Historial", href: SEARCH_MANAGEMENT_ROUTES.HISTORY },
  ],
} as const;

// External Routes (for email templates, etc.)
export const EXTERNAL_ROUTES = {
  SUPPORT_EMAIL: "mailto:support@fulldata.pro",
  DOCS: "https://docs.fulldata.pro",
  STATUS: "https://status.fulldata.pro",
} as const;

// Route Validation Helpers
export const isProtectedRoute = (path: string): boolean => {
  // Root path and all paths except auth and public routes are now protected
  return !isAuthRoute(path) && !isPublicRoute(path);
};

export const isAuthRoute = (path: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(path as any);
};

export const isPublicRoute = (path: string): boolean => {
  return Object.values(PUBLIC_ROUTES).includes(path as any);
};

// Route Building Helpers
export const buildSearchRoute = (service: string): string => {
  return `/search/${service}`;
};

export const buildReportRoute = (id: string | number): string => {
  return `/reports/${id}`;
};

// Breadcrumb Helpers
export const getRouteBreadcrumbs = (
  pathname: string
): Array<{ name: string; href: string }> => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [];
  let currentPath = "";

  // Add home for root
  if (pathname !== "/") {
    breadcrumbs.push({
      name: "Dashboard",
      href: "/",
    });
  }

  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;

    // Map paths to user-friendly names
    let name = segments[i];
    switch (segments[i]) {
      case "search":
        name = "Búsquedas";
        break;
      case "people":
        name = "Personas";
        break;
      case "company":
        name = "Empresas";
        break;
      case "vehicle":
        name = "Vehículos";
        break;
      case "phone":
        name = "Teléfonos";
        break;
      case "bank":
        name = "Bancos";
        break;
      case "osint":
        name = "OSINT";
        break;
      case "identity":
        name = "Identidad";
        break;
      case "reports":
        name = "Reportes";
        break;
      case "credits":
        name = "Búsquedas";
        break;
      case "history":
        name = "Historial";
        break;
      case "purchase":
        name = "Comprar";
        break;
      case "account":
        name = "Cuenta";
        break;
      case "settings":
        name = "Configuración";
        break;
      case "searches":
        name = "Búsquedas";
        break;
      case "new":
        name = "Nueva";
        break;
      default:
        // Capitalize first letter for unknown segments
        name = segments[i].charAt(0).toUpperCase() + segments[i].slice(1);
    }

    breadcrumbs.push({
      name,
      href: currentPath,
    });
  }

  return breadcrumbs;
};

// All Routes (for easy access)
export const ALL_ROUTES = {
  AUTH: AUTH_ROUTES,
  PUBLIC: PUBLIC_ROUTES,
  DASHBOARD: DASHBOARD_ROUTES,
  SEARCH: SEARCH_ROUTES,
  REPORT: REPORT_ROUTES,
  SEARCH_MANAGEMENT: SEARCH_MANAGEMENT_ROUTES,
  NAVIGATION: NAVIGATION_ROUTES,
  EXTERNAL: EXTERNAL_ROUTES,
} as const;

// Type exports for better TypeScript support
export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
export type PublicRoute = (typeof PUBLIC_ROUTES)[keyof typeof PUBLIC_ROUTES];
export type DashboardRoute =
  (typeof DASHBOARD_ROUTES)[keyof typeof DASHBOARD_ROUTES];
export type SearchRoute = (typeof SEARCH_ROUTES)[keyof typeof SEARCH_ROUTES];
export type SearchManagementRoute =
  (typeof SEARCH_MANAGEMENT_ROUTES)[keyof typeof SEARCH_MANAGEMENT_ROUTES];
export type AppRoute =
  | AuthRoute
  | PublicRoute
  | DashboardRoute
  | SearchRoute
  | SearchManagementRoute;
