import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export default function ProfileImgViewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const imageUrl = '/profileImage.jpg';
  // return (
  //   <Dialog.Root
  //     open={open}
  //     onOpenChange={(isOpen) => {
  //       if (isOpen) onClose();
  //     }}
  //   >
  //     <Dialog.Portal>
  //       <Dialog.Overlay className="fixed  inset-0 bg-black/40" />
  //       <Dialog.Content
  //         className="
  //           fixed left-1/2 top-1/4 w-full max-w-md
  //           -translate-x-1/2 -translate-y-1/2
  //           rounded-xl bg-white p-6 shadow-lg
  //           focus:outline-none
  //           ml-4

  //         "
  //       >
  //         <div className="mt-6 bg-green-500 w-100 h-100 space-y-3"></div>
  //         <Dialog.Close asChild>
  //           <button className="rounded-lg  right-3 top-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
  //             Cancel
  //           </button>
  //         </Dialog.Close>
  //       </Dialog.Content>
  //     </Dialog.Portal>
  //   </Dialog.Root>
  // );
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            w-full max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-2 shadow-lg
            focus:outline-none
            
          "
        >
          {/* Close button top-right */}
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </Dialog.Close>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src={imageUrl || '/profileImage.jpg'}
              alt="Profile"
              className="w-4/5 h-3/4  object-cover border"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col ">
            {imageUrl ? (
              <div className="flex gap-2">
                <button
                  // onClick={() => fileInputRef.current?.click()}
                  className="w-full w-1/4 ml-4  rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Change Image
                </button>
                <button
                  // onClick={onRemoveImage}
                  className="w-full w-1/4 ml-2 mr-3 rounded-md border border-red-600 text-red-600 py-2 hover:bg-red-50"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <button
                // onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700"
              >
                Add Image
              </button>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            // ref={fileInputRef}
            // onChange={handleFileSelect}
            className="hidden"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
