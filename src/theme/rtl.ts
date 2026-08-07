/*
 * ========================================
 * RTL (Right-to-Left) Support
 * ========================================
 */

export const rtlSupport = {
  // RTL-safe properties mapping
  properties: {
    marginLeft: "marginRight",
    marginRight: "marginLeft",
    paddingLeft: "paddingRight",
    paddingRight: "paddingLeft",
    borderLeft: "borderRight",
    borderRight: "borderLeft",
    borderLeftWidth: "borderRightWidth",
    borderRightWidth: "borderLeftWidth",
    borderLeftColor: "borderRightColor",
    borderRightColor: "borderLeftColor",
    left: "right",
    right: "left",
    textAlign: "textAlign",
  },

  // Text alignment mapping
  textAlign: {
    left: "left",
    right: "right",
    start: "start",
    end: "end",
  },

  // Direction constants
  direction: {
    LTR: "ltr",
    RTL: "rtl",
  },

  // CSS logical properties mapping
  logicalProperties: {
    marginInlineStart: "marginLeft",
    marginInlineEnd: "marginRight",
    paddingInlineStart: "paddingLeft",
    paddingInlineEnd: "paddingRight",
    borderInlineStart: "borderLeft",
    borderInlineEnd: "borderRight",
    insetInlineStart: "left",
    insetInlineEnd: "right",
  },
} as const;

export type RTLProperty = keyof typeof rtlSupport.properties;
export type RTLDirection = keyof typeof rtlSupport.direction;
export type RTLTextAlign = keyof typeof rtlSupport.textAlign;
