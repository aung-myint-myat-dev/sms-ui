import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { PageHeader } from "./components/PageHeader"
import { InfoRow } from "./components/InfoRow"
import { TranscationForm } from "./components/TranscationForm"
import { TranscationHistoriesTable } from "./components/TranscationHistoryTable"
import { api } from "../../lib/api"

export function BankDetail() {
  const { id } = useParams()

  const [bank, setBank] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedTranscation, setSelectedTranscation] = useState(null)

  const handleEditTranscation = (transcation) => {
    setSelectedTranscation(transcation)
    setIsEdit(true)
  }

  const handleCancelEditTranscation = () => {
    setIsEdit(false)
    fetchBank()
    setSelectedTranscation(null)
  }

  useEffect(() => {
    if (isEdit) {
      console.log(selectedTranscation)
    }
  }, [isEdit, selectedTranscation])

  const fetchBank = async () => {
    setIsEdit(false)
    setSelectedTranscation(null)

    const res = await api.get(`student-banks/${id}`)
    const bank = res.data.data

    setBank(bank)
  }

  useEffect(() => {
    if (!id) return

    fetchBank()
  }, [id])

  if (!bank) {
    return <div>No account.</div>
  }

  return (
    <div className="flex flex-col gap-4 rounded-md p-4 shadow-sm">
      <PageHeader
        isDetail={true}
        title="Account Detail"
        des="Transcation histories and detail informations."
      />

      <section className="flex items-center gap-4">
        <div className="flex h-50 flex-col justify-center gap-6 rounded-md border p-6 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white">
              U
            </div>

            <div className="space-y-1">
              <h2 className="font-bold text-zinc-700">
                {bank.student_name}
              </h2>

              <h2 className="text-xs text-zinc-600">
                {bank.student_code}
              </h2>
            </div>
          </div>

          <div className="space-y-2">
            <InfoRow
              label="Father Name"
              value={bank.father_name}
            />

            <InfoRow
              label="Grade"
              value={bank.grade}
            />
          </div>
        </div>

        <TranscationForm
          id={bank.id}
          onAfterSubmit={fetchBank}
          isEdit={isEdit}
          selectedTranscation={selectedTranscation}
          cancelEdit={handleCancelEditTranscation}
        />
      </section>

      {/* Transcation History */}
      <TranscationHistoriesTable
        fetchBank={fetchBank}
        histories={bank.transcations ?? []}
        mainBalance={bank.balance}
        onEdit={handleEditTranscation}
      />
    </div>
  )
}