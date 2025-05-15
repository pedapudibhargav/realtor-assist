// checklistEnums.js

// Requirement types
export const REQUIREMENT_TYPE = {
    REQUIRED: 'Required',
    OPTIONAL: 'Optional',
  };
  
  // Status labels
  export const STATUS = {
    APPROVED: 'Approved',
    PENDING_REVIEW: 'Pending Review',
    CHANGES_NEEDED: 'Changes Needed',
  };
  
  // Button labels
  export const ACTION_LABELS = {
    VIEW: 'View',
    UPLOAD: 'Upload',
    ASSIGN: 'Assign',
    REUPLOAD: 'Re-Upload',
  };
  
  // Badge variants for Bootstrap
  export const STATUS_BADGE_VARIANTS = {
    [STATUS.APPROVED]: 'success',
    [STATUS.PENDING_REVIEW]: 'warning',
    [STATUS.CHANGES_NEEDED]: 'danger',
  };
  
  // Checklist category keys (optional, for internal consistency)
  export const CATEGORY_KEYS = {
    OFFER: 'offer',
    INSPECTION: 'inspection',
    APPRAISAL: 'appraisal',
    TITLE: 'title',
  };
  