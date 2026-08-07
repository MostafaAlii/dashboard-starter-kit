/*
 * ========================================
 * Z-INDEX SYSTEM
 * ========================================
 */

export const zIndex = {
  // ===== Base =====
  base: 1,

  // ===== Navigation =====
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,

  // ===== Modals =====
  modalBackdrop: 1040,
  modal: 1050,

  // ===== Overlays =====
  popover: 1060,
  tooltip: 1070,
  toast: 1080,

  // ===== Loading =====
  loader: 1090,

  // ===== Highest =====
  max: 9999,

  // ===== Negative =====
  negative: -1,
} as const;

export type ZIndexKey = keyof typeof zIndex;

// ===== Semantic Z-Index =====
export const zIndexSemantic = {
  sidebar: zIndex.sticky,
  header: zIndex.sticky,
  backdrop: zIndex.modalBackdrop,
  drawer: zIndex.modal,
  notification: zIndex.toast,
  loading: zIndex.loader,
  autocomplete: zIndex.dropdown,
  datePicker: zIndex.popover,
} as const;
