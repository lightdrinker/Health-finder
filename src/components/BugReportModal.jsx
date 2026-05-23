import { useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function BugReportModal({ appName, onClose }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setStatus('sending')
    setErrorMsg('')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          app_name: appName,
          bug_title: title.trim(),
          bug_body: body.trim(),
          reporter_contact: contact.trim() || '(미입력)',
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.text || err?.message || '전송 중 오류가 발생했어요.')
    }
  }

  const handleBackdropClick = () => {
    if (status === 'sending') return
    onClose()
  }

  const stop = (e) => e.stopPropagation()

  return (
    <div className="bug-modal-backdrop" onClick={handleBackdropClick}>
      <div className="bug-modal" onClick={stop} role="dialog" aria-modal="true">
        {status === 'sent' ? (
          <div className="bug-modal-success">
            <div className="bug-modal-check">✓</div>
            <h3>리포트 전송 완료</h3>
            <p>소중한 의견 감사합니다.<br />빠른 시일 내 확인할게요.</p>
            <button type="button" className="btn-primary" onClick={onClose}>
              닫기
            </button>
          </div>
        ) : (
          <>
            <div className="bug-modal-header">
              <h3>버그 리포트</h3>
              <button
                type="button"
                className="bug-modal-close"
                onClick={onClose}
                aria-label="닫기"
                disabled={status === 'sending'}
              >
                ×
              </button>
            </div>
            <form className="bug-modal-form" onSubmit={handleSubmit}>
              <label className="bug-field">
                <span>제목 *</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder="어떤 문제가 있었나요?"
                  required
                  disabled={status === 'sending'}
                />
              </label>
              <label className="bug-field">
                <span>내용 *</span>
                <textarea
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="발생한 상황, 재현 단계, 기대했던 동작 등을 적어주세요."
                  required
                  disabled={status === 'sending'}
                />
              </label>
              <label className="bug-field">
                <span>연락처 (선택)</span>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="이메일 또는 SNS (회신 받고 싶다면)"
                  disabled={status === 'sending'}
                />
              </label>
              {status === 'error' && (
                <div className="bug-modal-error">{errorMsg}</div>
              )}
              <div className="bug-modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onClose}
                  disabled={status === 'sending'}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'sending' || !title.trim() || !body.trim()}
                >
                  {status === 'sending' ? '전송 중...' : '전송'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default BugReportModal
