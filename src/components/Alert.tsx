import React from 'react'

type Props = {
  restore: () => void
}

export const Alert: React.FC<Props> = ({ restore }) => (
  <div
    className="absolute top-0 right-0 w-1/4 mt-4 mr-4 bg-red-500 rounded transition-all duration-100"
    role="alert"
  >
    <div className="px-4 py-3 text-red-700 border border-red-400 rounded">
      <div className="flex items-center justify-between text-white">
        <p>タスクを削除しました</p>
        <button className="text-xs font-bold" onClick={restore}>
          元に戻す
        </button>
      </div>
    </div>
  </div>
)
