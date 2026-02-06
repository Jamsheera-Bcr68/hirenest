import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useProfileEdit } from '../hooks/user/candidate/profile/useProfileEdit';
import { useToast } from '../../shared/toast/useToast';

export default function ProfileEditModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {showToast,ToastElement}=useToast()
  const { formData, handleChange, handleSubmit, error } = useProfileEdit(showToast);
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
          className="fixed left-1/2 top-1/2 z-50
                    w-full max-w-md ml-2
                    -translate-x-1/2 -translate-y-1/2
                     rounded-xl bg-white p-2 shadow-lg
                     focus:outline-none
                     max-h-[90vh]
                      overflow-y-auto
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
          <Dialog.Title className="text-2xl font-semibold mt-3 text-indigo-800 text-center">
            Edit Profie
          </Dialog.Title>
          <form action="" onSubmit={handleSubmit}>
            <div className="mt-6 space-y-3 ml-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name :</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Eg:John"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {error?.name && formData.name !== '' && (
                  <p className="text-red-500 text-sm">*{error.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Title :
                </label>
                <div>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Eg: FullStack Developer"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.title && formData.title !== '' && (
                    <p className="text-red-500 text-sm">*{error.title}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Place :
                </label>
                <div>
                  <input
                    onChange={handleChange}
                    name="place"
                    value={formData.place}
                    type="text"
                    placeholder="Eg: Chennai"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.place && formData.place !== '' && (
                    <p className="text-red-500 text-sm">*{error.place}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  State :
                </label>
                <div>
                  <input
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    type="text"
                    placeholder="Eg:Thamil Nadu"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.state && formData.state !== '' && (
                    <p className="text-red-500 text-sm">*{error.state}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Coutry:
                </label>
                <div>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    type="text"
                    placeholder="Eg:India "
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.country && formData.country !== '' && (
                    <p className="text-red-500 text-sm">*{error.country}</p>
                  )}
                </div>
              </div>
              <div className=" flex gap-10">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className=" w-1/4 ml-10 bg-red-600 rounded-md border border-red-600 text-white py-2 hover:bg-red-400"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className=" w-1/4 ml-10 mr-3 rounded-md border bg-green-600 text-white py-2 hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          {ToastElement}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
