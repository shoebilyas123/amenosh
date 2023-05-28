export const temp = '';

export interface IContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  userType: {
    default: string;
    custom: string;
  };
  pincode: string;
  city: string;
}

export const styles = {
  inputClass:
    'focus:shadow-sm w-full border border-2 rounded-lg px-4 py-2 outline-none border-red-200 focus:border-red-500 placeholder:text-zinc-500 placeholder:rounded-lg',
};
