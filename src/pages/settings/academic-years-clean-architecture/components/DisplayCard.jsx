export function DisplayCard({ title, children }) {
  return (
    <section className="space-y-4 rounded-[10px] border border-[#0000004D] bg-white p-4">
      <h2 className="text-[18px] font-semibold text-[#228B22]">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
