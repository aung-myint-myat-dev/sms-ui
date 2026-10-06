import { useEffect, useState } from 'react'
import { Save, Search, X, XIcon } from 'lucide-react'
import { AxiosError } from 'axios'
import { Button } from '../../settings/payments/components/ui/Button'
import { api } from '../../../lib/api'

const createEmptyForm = () => ({
  student_code: '',
  student_name: '',
  father_name: '',
  grade: '',
  balance: 0,
  payment_method: 'cash',
  opening_amount_type: 'debit',
})

const createEmptyErrors = () => ({
  student_code: '',
  student_name: '',
  father_name: '',
  grade: '',
  balance: '',
  payment_method: '',
  opening_amount_type: '',
})

export function BankAction({
  open,
  isEdit,
  selectedBank,
  onClose,
  onAfterSubmit,
}) {
  const [formData, setFormData] = useState(createEmptyForm)
  const [errors, setErrors] = useState(createEmptyErrors)
  const [searchedStudent, setSearchedStudent] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Reset initial form
  useEffect(() => {
    if (!open) {
      return
    }

    setErrors(createEmptyErrors())
    setSearchedStudent(null)

    if (isEdit && selectedBank) {
      const editForm = {
        student_code: selectedBank.student_code,
        student_name: selectedBank.student_name,
        father_name: selectedBank.father_name,
        grade: selectedBank.grade,
        balance: selectedBank.balance,
        payment_method: selectedBank.payment_method,
        opening_amount_type:
          selectedBank.opening_amount_type ?? 'debit',
      }

      setFormData(editForm)
      searchStudentByCode(selectedBank.student_code)

      return
    }

    setFormData(createEmptyForm())
  }, [open, isEdit, selectedBank])

  // Search Student
  const searchStudentByCode = async (studentCode) => {
    const code = studentCode.trim()

    if (!code) {
      setSearchedStudent(null)

      setErrors((prev) => ({
        ...prev,
        student_code: 'Student code is required.',
      }))

      return
    }

    try {
      setIsSearching(true)

      const res = await api.get('students', {
        params: {
          search: code,
        },
      })

      const student = res.data.data?.[0]

      if (!student) {
        setSearchedStudent(null)

        setErrors((prev) => ({
          ...prev,
          student_code: 'Student not found.',
        }))

        return
      }

      setSearchedStudent(student)

      setFormData((prev) => ({
        ...prev,
        student_code: student.student_code ?? code,
        student_name: student.name,
        father_name: student.father_name,
        grade: student.class.name,
      }))

      setErrors((prev) => ({
        ...prev,
        student_code: '',
      }))
    } catch (error) {
      console.error('Failed to search student:', error)

      setSearchedStudent(null)

      setErrors((prev) => ({
        ...prev,
        student_code: 'Failed to search student.',
      }))
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = () => {
    searchStudentByCode(formData.student_code)
  }

  // Form Change
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'balance'
        ? Number(value)
        : value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  // Validation form
  const validate = () => {
    const newErrors = createEmptyErrors()

    if (!searchedStudent) {
      newErrors.student_code =
        'Please search and select a student.'
    }

    if (!formData.opening_amount_type) {
      newErrors.opening_amount_type =
        'Opening amount type is required.'
    }

    if (!formData.balance || Number(formData.balance) <= 0) {
      newErrors.balance =
        'Amount must be greater than 0.'
    }

    const hasErrors = Object.values(newErrors).some(
      (error) => Boolean(error),
    )

    setErrors(newErrors)

    return !hasErrors
  }

  // Submit Form
  const submitForm = async () => {
    if (!validate() || !searchedStudent) {
      return
    }

    const amount = Math.abs(Number(formData.balance))

    const payload = {
      student_code: formData.student_code,
      student_name: searchedStudent.name,
      father_name: searchedStudent.father_name,
      grade: searchedStudent.class.name,
      opening_amount_type: formData.opening_amount_type,
      payment_method: formData.payment_method,
      balance:
        formData.opening_amount_type === 'credit'
          ? -amount
          : amount,
    }

    try {
      setIsSaving(true)

      if (isEdit && selectedBank) {
        console.log(selectedBank)

        await api.put(
          `student-banks/${selectedBank.id}`,
          payload,
        )
      } else {
        await api.post('/student-banks', payload)
      }

      onAfterSubmit()
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.status === 422
      ) {
        const errors = error.response.data.errors

        Object.entries(errors).forEach(([field, message]) => {
          setErrors((prev) => ({
            ...prev,
            [field]: Array.isArray(message)
              ? message[0]
              : String(message),
          }))
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    if (isSaving) {
      return
    }

    setFormData(createEmptyForm())
    setErrors(createEmptyErrors())
    setSearchedStudent(null)

    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-900/30 p-2 backdrop-blur-sm">

      {/* Overlay */}
      <button
        type="button"
        aria-label="Close form"
        onClick={handleClose}
        disabled={isSaving}
        className="absolute inset-0 cursor-default"
      />

      {/* Form */}
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">
              {isEdit
                ? 'Edit Account'
                : 'Create New Account'}
            </h2>

            <p className="text-sm text-zinc-500">
              {isEdit
                ? 'Update the student bank transaction.'
                : 'Search student and fill the form to create a student bank account.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            className="flex size-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-3">

          {/* Search Student */}
          <section className="space-y-3">
            <div>
              <label
                htmlFor="student-search"
                className="text-sm font-semibold text-zinc-800"
              >
                {isEdit ? 'Selected' : 'Search'} Student
              </label>

              <p className="mt-1 text-xs text-zinc-500">
                {isEdit
                  ? 'Student information is loaded from the student record.'
                  : 'Enter the student code to find a student.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`relative flex h-9 flex-1 items-center rounded-full border bg-white px-3 transition-colors duration-200 ${
                  errors.student_code
                    ? 'border-red-400 focus-within:border-red-500'
                    : 'border-zinc-300 focus-within:border-zinc-500'
                }`}
              >
                <input
                  id="student-search"
                  type="text"
                  value={formData.student_code}
                  disabled={isSearching || isSaving}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      student_code: e.target.value,
                    }))

                    setSearchedStudent(null)

                    if (errors.student_code) {
                      setErrors((prev) => ({
                        ...prev,
                        student_code: '',
                      }))
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearch()
                    }
                  }}
                  placeholder="e.g. STU-0011"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:text-zinc-500"
                />

                {errors.student_code && (
                  <p className="absolute -bottom-6 left-0 text-xs text-red-500">
                    {errors.student_code}
                  </p>
                )}
              </div>

              <Button
                type="button"
                icon={Search}
                onClick={handleSearch}
                disabled={isSearching || isSaving}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </section>

          {/* Student Information */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-800">
              Student Information
            </h4>

            <p className="text-xs text-zinc-500">
              Information will be automatically filled.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="student-name"
                  className="text-sm font-medium text-zinc-500"
                >
                  Name
                </label>

                <input
                  id="student-name"
                  value={formData.student_name}
                  disabled
                  placeholder="Student name"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none"
                />
              </div>

              {/* Father Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="father-name"
                  className="text-sm font-medium text-zinc-600"
                >
                  Father Name
                </label>

                <input
                  id="father-name"
                  value={formData.father_name}
                  disabled
                  placeholder="Father name"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none"
                />
              </div>

              {/* Grade */}
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="current-grade"
                  className="text-sm font-medium text-zinc-500"
                >
                  Current Grade
                </label>

                <input
                  id="current-grade"
                  value={formData.grade}
                  disabled
                  placeholder="Current Grade"
                  className="w-full cursor-not-allowed rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Amount Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-800">
              Amount Information
            </h3>

            {/* Type and Method */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Opening Amount Type */}
              <div className="space-y-1.5">
                <label
                  htmlFor="opening-amount-type"
                  className="text-sm font-medium text-zinc-700"
                >
                  Opening Amount Type
                </label>

                <select
                  id="opening-amount-type"
                  name="opening_amount_type"
                  value={formData.opening_amount_type}
                  onChange={handleChange}
                  disabled={isSaving || !searchedStudent}
                  className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition ${
                    errors.opening_amount_type
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-zinc-300 focus:border-zinc-500'
                  } ${
                    !searchedStudent &&
                    'border bg-zinc-50 text-zinc-500'
                  }`}
                >
                  <option value="">
                    Select Amount Type
                  </option>
                  <option value="debit">
                    Debit (+)
                  </option>
                  <option value="credit">
                    Credit (-)
                  </option>
                </select>

                {errors.opening_amount_type && (
                  <p className="text-xs text-red-500">
                    {errors.opening_amount_type}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5">
                <label
                  htmlFor="payment-method"
                  className="text-sm font-medium text-zinc-700"
                >
                  Payment Method
                </label>

                <select
                  id="payment-method"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  disabled={isSaving || !searchedStudent}
                  className={`w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500 ${
                    !searchedStudent &&
                    'border bg-zinc-50 text-zinc-500'
                  }`}
                >
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                  <option value="kbzpay">KBZ Pay</option>
                </select>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-zinc-700"
              >
                Amount
              </label>

              <div
                className={`flex items-center rounded-md border px-3 transition ${
                  errors.balance
                    ? 'border-red-400 focus-within:border-red-500'
                    : 'border-zinc-300 focus-within:border-zinc-500'
                } ${
                  !searchedStudent &&
                  'border bg-zinc-50 text-zinc-500'
                }`}
              >
                <input
                  id="amount"
                  name="balance"
                  type="number"
                  min="1"
                  value={formData.balance || ''}
                  onChange={handleChange}
                  disabled={isSaving || !searchedStudent}
                  placeholder="Enter amount"
                  className={`w-full bg-transparent py-2 text-sm outline-none ${
                    formData.opening_amount_type === 'credit'
                      ? 'text-red-500'
                      : 'text-zinc-950'
                  }`}
                />

                <span className="ps-2 text-xs text-zinc-400">
                  MMK
                </span>
              </div>

              {errors.balance && (
                <p className="text-xs text-red-500">
                  {errors.balance}
                </p>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 py-2">
            <Button
              type="button"
              onClick={handleClose}
              icon={XIcon}
              variant="danger"
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={submitForm}
              icon={Save}
              disabled={isSaving || !searchedStudent}
            >
              {isSaving
                ? 'Saving...'
                : isEdit
                  ? 'Update'
                  : 'Save'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}