/*
 * ========================================
 * RTL (Right-to-Left) Support
 * ========================================
 */

export const rtlSupport = {
  /**
   * Direction constants
   */
  direction: {
    LTR: "ltr",
    RTL: "rtl",
  },

  /**
   * Text alignment
   */
  textAlign: {
    left: "left",
    right: "right",
    start: "start",
    end: "end",
  },

  /**
   * RTL-safe property mappings
   */
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

  /**
   * CSS logical properties
   */
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

export type RTLDirection =
  (typeof rtlSupport.direction)[keyof typeof rtlSupport.direction];

export type RTLTextAlign = keyof typeof rtlSupport.textAlign;
