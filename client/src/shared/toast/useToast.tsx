import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

export type ToastType = "success" | "error" | "info";
export const toastStyle: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-yellow-600 text-white",
};

export type typeOfToast = {
  msg: string;
  type: ToastType;
};

export function useToast() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<typeOfToast>({ msg: "", type: "info" });

  const showToast = (payLoad: typeOfToast) => {
    console.log('from tost',payLoad);
    
    setToast(payLoad);
    setOpen(true);
  };
  const ToastElement = (
    <Toast.Root
      open={open}
      duration={3000}
      onOpenChange={setOpen}
      className={`toast ${toastStyle[toast.type]}`}
    >
      <Toast.Description>{toast.msg}</Toast.Description>
    </Toast.Root>
  );
  return {
    showToast,
    ToastElement,
  };
}
