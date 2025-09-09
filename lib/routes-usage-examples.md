# Routes Constants Usage Examples

This file contains examples of how to use the centralized routes constants (`@/lib/routes`) throughout the application.

## Basic Usage

### Importing Routes

```typescript
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  SEARCH_ROUTES,
  CREDITS_ROUTES,
  REPORT_ROUTES,
} from "@/lib/routes";
```

### Navigation with useRouter

```typescript
import { useRouter } from "next/navigation";
import { DASHBOARD_ROUTES } from "@/lib/routes";

const router = useRouter();

// Navigate to dashboard home
router.push(DASHBOARD_ROUTES.HOME);

// Navigate to people search
router.push(SEARCH_ROUTES.PEOPLE);

// Navigate to credits history
router.push(CREDITS_ROUTES.HISTORY);
```

### Links with Next.js Link Component

```typescript
import Link from 'next/link'
import { AUTH_ROUTES, SEARCH_ROUTES } from '@/lib/routes'

<Link href={AUTH_ROUTES.LOGIN}>Login</Link>
<Link href={SEARCH_ROUTES.COMPANIES}>Search Companies</Link>
```

### Dynamic Routes

```typescript
import { REPORT_ROUTES } from "@/lib/routes";

// For report details with dynamic ID
const reportId = 123;
router.push(REPORT_ROUTES.DETAIL(reportId));

// Or with string ID
const reportId = "report-abc-123";
router.push(REPORT_ROUTES.DETAIL(reportId));
```

## Sidebar Menu Example

```typescript
import { DASHBOARD_ROUTES, SEARCH_ROUTES } from "@/lib/routes";

const menuItems = [
  {
    name: "Dashboard",
    href: DASHBOARD_ROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "People Search",
    href: SEARCH_ROUTES.PEOPLE,
    icon: PersonIcon,
  },
];
```

## Conditional Navigation

```typescript
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "@/lib/routes";

const handleLogin = async () => {
  try {
    await login(credentials);
    router.push(DASHBOARD_ROUTES.HOME);
  } catch (error) {
    router.push(AUTH_ROUTES.LOGIN);
  }
};
```

## Route Validation

```typescript
import { isProtectedRoute, isAuthRoute } from "@/lib/routes";

// Check if route requires authentication
if (isProtectedRoute(pathname)) {
  // Redirect to login
}

// Check if it's an auth route
if (isAuthRoute(pathname)) {
  // Handle auth-specific logic
}
```

## Breadcrumbs

```typescript
import { getRouteBreadcrumbs } from "@/lib/routes";

const breadcrumbs = getRouteBreadcrumbs(" /search/people");
// Returns: [
//   { name: 'Dashboard', href: ' ' },
//   { name: 'Búsquedas', href: ' /search' },
//   { name: 'Personas', href: ' /search/people' }
// ]
```

## Benefits of Using Route Constants

1. **Type Safety**: TypeScript will catch typos and invalid routes
2. **Centralized Management**: All routes are defined in one place
3. **Easy Refactoring**: Change a route once, update everywhere
4. **Consistency**: No more hardcoded strings scattered throughout the codebase
5. **Auto-completion**: IDE will suggest available routes
6. **Documentation**: Routes are self-documenting with clear naming

## Migration from Hardcoded Routes

### Before:

```typescript
router.push(' /search/people')
router.push('  /searches/history')
<Link href="/login">Login</Link>
```

### After:

```typescript
import { SEARCH_ROUTES, CREDITS_ROUTES, AUTH_ROUTES } from '@/lib/routes'

router.push(SEARCH_ROUTES.PEOPLE)
router.push(CREDITS_ROUTES.HISTORY)
<Link href={AUTH_ROUTES.LOGIN}>Login</Link>
```

This approach ensures maintainable, type-safe navigation throughout the application.
