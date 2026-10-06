export function TranscationTypeRadio(props) {
  const isCashIn = props.value === "cash_in";

  const colorClass = isCashIn
    ? {
        hover:
          "hover:border-green-500 hover:bg-green-500 hover:text-white",
        checked: "border-green-500 bg-green-500 text-white",
        circle: `border-zinc-500 ${
          !props.disabled ? "group-hover:border-white" : ""
        }`,
        dot: "bg-green-500",
      }
    : {
        hover:
          "hover:border-red-500 hover:bg-red-500 hover:text-white",
        checked: "border-red-500 bg-red-500 text-white",
        circle: `border-zinc-500 ${
          !props.disabled ? "group-hover:border-white" : ""
        }`,
        dot: "bg-red-500",
      };

  const disabledClass = props.disabled
    ? "opacity-50 cursor-not-allowed"
    : "";

  return (
    <label
      htmlFor={props.id}
      className={`
        cursor-pointer
        border
        py-1.5
        px-4
        rounded-full
        flex
        items-center
        gap-3
        transition-all
        duration-200
        group
        border-zinc-300
        text-zinc-600

        ${props.disabled ? disabledClass : colorClass.hover}

        ${props.checked ? colorClass.checked : ""}
      `}
    >
      <input
        id={props.id}
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        className="sr-only"
      />

      {/* Radio Circle */}
      <span
        className={`
          w-4
          h-4
          rounded-full
          border-2
          flex
          items-center
          justify-center
          transition-all
          duration-200

          ${props.checked ? "border-white" : colorClass.circle}
        `}
      >
        {props.checked && (
          <span className="w-2 h-2 rounded-full bg-white" />
        )}
      </span>

      <span
        className={`font-medium text-sm select-none ${
          props.checked ? "text-white" : ""
        }`}
      >
        {props.label}
      </span>
    </label>
  );
}