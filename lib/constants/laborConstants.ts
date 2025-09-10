/**
 * Labor-related constants and translations
 */

// Labor Situation enum values from API
export enum LaborSituation {
  MONOTRIBUTE = 'MONOTRIBUTE',
  EMPLOYEE = 'EMPLOYEE',
  EMPLOYER = 'EMPLOYER',
  AUTONOMOUS = 'AUTONOMOUS',
  RETIRED = 'RETIRED',
  UNEMPLOYED = 'UNEMPLOYED',
  INFORMAL = 'INFORMAL',
  DOMESTIC_WORKER = 'DOMESTIC_WORKER',
  SOCIAL_MONOTRIBUTE = 'SOCIAL_MONOTRIBUTE',
  INDEPENDENT = 'INDEPENDENT',
}

// Spanish translations for labor situations
export const LABOR_SITUATION_LABELS: Record<string, string> = {
  MONOTRIBUTE: 'Monotributista',
  EMPLOYEE: 'Empleado',
  EMPLOYER: 'Empleador',
  AUTONOMOUS: 'Autónomo',
  RETIRED: 'Jubilado',
  UNEMPLOYED: 'Desempleado',
  INFORMAL: 'Trabajo Informal',
  DOMESTIC_WORKER: 'Empleado Doméstico',
  SOCIAL_MONOTRIBUTE: 'Monotributo Social',
  INDEPENDENT: 'Independiente',
  // Add any other possible values
  SELF_EMPLOYED: 'Trabajador Independiente',
  FREELANCER: 'Freelancer',
  CONTRACTOR: 'Contratista',
}

// Activity types
export enum ActivityType {
  P = 'P', // Principal
  S = 'S', // Secondary
  T = 'T', // Tertiary
}

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  P: 'Principal',
  S: 'Secundaria',
  T: 'Terciaria',
}

// Salary categories
export const SALARY_CATEGORY_LABELS: Record<string, string> = {
  A1: 'Categoría A1',
  A2: 'Categoría A2',
  A3: 'Categoría A3',
  B1: 'Categoría B1',
  B2: 'Categoría B2',
  B3: 'Categoría B3',
  C1: 'Categoría C1',
  C2: 'Categoría C2',
  C3: 'Categoría C3',
  D1: 'Categoría D1',
  D2: 'Categoría D2',
}

// Helper function to translate labor situation
export function translateLaborSituation(situation: string): string {
  return LABOR_SITUATION_LABELS[situation] || situation
}

// Helper function to translate activity type
export function translateActivityType(type: string): string {
  return ACTIVITY_TYPE_LABELS[type] || type
}

// Helper function to translate salary category
export function translateSalaryCategory(category: string): string {
  return SALARY_CATEGORY_LABELS[category] || category
}

// Helper to get badge color based on labor situation
export function getLaborSituationColor(situation: string): string {
  switch (situation) {
    case LaborSituation.EMPLOYEE:
      return 'bg-green-100 text-green-800'
    case LaborSituation.MONOTRIBUTE:
      return 'bg-blue-100 text-blue-800'
    case LaborSituation.EMPLOYER:
      return 'bg-purple-100 text-purple-800'
    case LaborSituation.AUTONOMOUS:
      return 'bg-indigo-100 text-indigo-800'
    case LaborSituation.RETIRED:
      return 'bg-amber-100 text-amber-800'
    case LaborSituation.UNEMPLOYED:
      return 'bg-red-100 text-red-800'
    case LaborSituation.INFORMAL:
      return 'bg-orange-100 text-orange-800'
    case LaborSituation.DOMESTIC_WORKER:
      return 'bg-teal-100 text-teal-800'
    case LaborSituation.SOCIAL_MONOTRIBUTE:
      return 'bg-cyan-100 text-cyan-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}