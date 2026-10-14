import { Button } from "./Button";

export function Modal({ open = false, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center font-roboto">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-zinc-900/50"
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

export function ModalContent({ children, className = "" }) {
  return (
    <div className={`flex h-max min-w-[318px] flex-col rounded-[15px] bg-white p-[29px] ${className}`}>
      {children}
    </div>
  );
}

export function ModalTitle({ children, className = "" }) {
  return <h2 className={`text-[16px] font-semibold ${className}`}>{children}</h2>;
}

export function ModalAction({ children, className = "" }) {
  return (
    <div className={`mt-auto flex items-center justify-end gap-2 pt-6 ${className}`}>
      {children}
    </div>
  );
}

export function ModalClose({ onClose }) {
  return <Button variant="outline" onClick={onClose}>Close</Button>;
}
