import axios from "axios";

export function handleFormErrors(error, setErrors) {
  if(axios.isAxiosError(error) && error.response?.status === 422) {
    const errors = error.response.data.errors
    console.log(errors)

    Object.entries(errors).forEach(([field, message]) => {
      setErrors((prev) => ({
        ...prev,
        [field]: Array.isArray(message) ? message[0] : String(message)
      }))
    })
  }
}