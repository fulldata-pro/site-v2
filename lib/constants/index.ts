export * from './laborConstants'
export * from './relationshipConstants'

// Re-export commonly used constants
export {
  LaborSituation,
  ActivityType,
  translateLaborSituation,
  translateActivityType,
  translateSalaryCategory,
  getLaborSituationColor,
  LABOR_SITUATION_LABELS,
  ACTIVITY_TYPE_LABELS,
  SALARY_CATEGORY_LABELS
} from './laborConstants'

export {
  translateRelationship,
  translateSex,
  getRelationshipStyle,
  RELATIONSHIP_MAPPINGS,
  GENERIC_RELATIONSHIP_LABELS
} from './relationshipConstants'