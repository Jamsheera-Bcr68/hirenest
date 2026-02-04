import * as Dialog from "@radix-ui/react-dialog";
import ChangePassword from "./ChangePassword";

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
    if (!isOpen) onClose();
  }}
    >
      {/* Portal */}
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <ChangePassword />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// export default function ChangePasswordModal({
//   open,
//   onClose,
//   children,
// }: {
//   open: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }) {
//  return( <div
//     onClick={onClose}
//     className={`fixed inset-0 justify-center items-center transition-colors
//     ${open ? "visible bg-black/20" : "invisible"} `}
//   >
//     {children}
//   </div>)
// }
