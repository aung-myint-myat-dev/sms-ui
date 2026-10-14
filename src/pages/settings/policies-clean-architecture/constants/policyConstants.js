export const POLICY_TYPES = {
  SCHOOL: "school",
  APP: "app",
};

export const POLICY_TYPE_OPTIONS = [
  { value: POLICY_TYPES.SCHOOL, label: "School Policies" },
  { value: POLICY_TYPES.APP, label: "App Policies" },
];

export const EMPTY_POLICY_FORM = {
  type: "",
  title: "",
  description: "",
};

export const EMPTY_POLICY_ERRORS = {
  type: "",
  title: "",
  description: "",
};

export const DEFAULT_POLICY_DESCRIPTION = [
  "• Personal Information: Student grades, attendance, health records, and family contact details are kept strictly confidential.",
  "• Data Usage: Data collected in the app is used solely for educational, administrative, and communication purposes within the school.",
  "• No Third-Party Sharing: Student and family data will never be sold or shared with external commercial entities.",
].join("\n");

export const DESCRIPTION_TOOLBAR_BUTTONS = [
  { label: "Paragraph", type: "paragraph", className: "font-medium" },
  { label: "B", type: "bold", className: "font-bold" },
  { label: "I", type: "italic", className: "italic" },
  { label: "U", type: "underline", className: "underline" },
  { label: "≡", type: "list", className: "tracking-tight" },
  { label: "☰", type: "list-ol", className: "tracking-tight" },
  { label: "≣", type: "align", className: "tracking-tight" },
];
