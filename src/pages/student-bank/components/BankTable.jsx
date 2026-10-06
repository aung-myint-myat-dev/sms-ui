import { useNavigate } from 'react-router'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { isCreditBalance } from '../lib/is-credit-balance'

export function BanksTable({
  banks,
  onEditBank,
  onDeleteBank,
}) {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <colgroup>
            <col className="w-[13%]" />
            <col className="w-[7%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[11%]" />
            <col className="w-[18%]" />
            <col className="w-[11%]" />
          </colgroup>

          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-6 py-2.5 text-left text-sm font-semibold text-zinc-700">
                Student Code
              </th>

              <th className="px-6 py-2.5 text-left text-sm font-semibold text-zinc-700">
                Photo
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-semibold text-zinc-700">
                Student Name
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-semibold text-zinc-700">
                Father Name
              </th>

              <th className="px-4 py-2.5 text-left text-sm font-semibold text-zinc-700">
                Grade
              </th>

              <th className="px-4 py-2.5 text-right text-sm font-semibold text-zinc-700">
                Balance
              </th>

              <th className="px-6 py-2.5 text-right text-sm font-semibold text-zinc-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {banks.map((bank, index) => {
              const amount = Number(bank.balance)
                .toLocaleString()
                .replace('-', '')

              return (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-zinc-50"
                >
                  <td className="w-40 px-6 py-3 text-sm text-zinc-600">
                    {bank.student_code}
                  </td>

                  <td className="flex items-center justify-center px-4 py-3 text-sm text-zinc-600">
                    <div className="flex size-10 items-center justify-center rounded-full bg-green-500 font-semibold text-white">
                      PF
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.student_name}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.father_name}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {bank.grade}
                  </td>

                  <td className="px-4 py-3 text-right text-sm text-zinc-600">
                    <span
                      className={
                        isCreditBalance(Number(bank.balance))
                          ? 'text-red-500'
                          : 'text-zinc-600'
                      }
                    >
                      {amount} MMK
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/student-banks/${bank.id}`)
                        }
                      >
                        <Eye className="size-4 cursor-pointer text-blue-500" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditBank(bank)}
                      >
                        <Pencil className="size-4 cursor-pointer text-yellow-500" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDeleteBank(bank.student_code)
                        }
                      >
                        <Trash2 className="size-4 cursor-pointer text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}