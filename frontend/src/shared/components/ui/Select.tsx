/**
 * @fileoverview Styled native `<select>` wrapper with optional label support.
 */

/** A single option entry in the {@link Select} dropdown. */
interface SelectOption {
  /** Machine-readable value submitted by the form. */
  value: string
  /** Human-readable text displayed in the dropdown list. */
  label: string
}

/** Props accepted by the {@link Select} component. */
interface SelectProps {
  /** Array of selectable options. */
  options: SelectOption[]
  /** Currently selected option value. */
  value: string
  /** Callback invoked with the newly chosen value on every change. */
  onChange: (value: string) => void
  /** Placeholder text shown when no option is selected. */
  placeholder?: string
  /** Text label rendered above the select element. */
  label?: string
}

/**
 * A dark-themed native select element with an optional visible label.
 * Uses a native `<select>` for maximum accessibility and OS-level UX.
 *
 * @param props - {@link SelectProps}
 */
export function Select({ options, value, onChange, placeholder, label }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full bg-slate-800 border border-slate-700 text-slate-100
          rounded-lg px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:opacity-40 disabled:cursor-not-allowed
          appearance-none cursor-pointer
        "
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
