export function PaymentMethodSelect({
  enable,
  value,
  onChange,
  error,
}) {
  return (
    <div className="relative rounded-sm border p-2 shadow-xs">
      <label
        htmlFor="payment-method-input"
        className={`absolute -top-2 left-2 bg-white px-2 text-xs font-semibold ${
          enable ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        Select payment method
      </label>

      <select
        id="payment-method-input"
        disabled={!enable}
        value={value}
        name="payment_method"
        onChange={onChange}
        className={`h-full w-full bg-transparent text-sm outline-none ${
          enable ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        <option value="">Select payment method</option>

        <option value="cash">Cash</option>

        <option value="kbzpay">KBZ Pay</option>

        <option value="wavepay">Wave Pay</option>
      </select>

      {error && (
        <span className="absolute -bottom-2 right-2 bg-white px-2 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}