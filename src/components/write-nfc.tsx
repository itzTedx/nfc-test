import { useState } from 'react'

export default function WriteNfcComponent() {
  const [url, setUrl] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const writeUrlToNfcTag = async (): Promise<void> => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader()
        setShowModal(true) // Show modal on start of NFC write process
        await ndef.write({
          records: [{ recordType: 'url', data: url }],
        })
        alert('URL written to NFC tag successfully!')
      } catch (error) {
        console.error('Error writing to NFC tag:', error)
        alert('Error writing to NFC tag. Please try again.')
      } finally {
        setShowModal(false) // Hide modal after operation
      }
    } else {
      alert('Web NFC is not supported on this device.')
    }
  }

  const handleWrite = (): void => {
    if (url) {
      writeUrlToNfcTag()
    } else {
      alert('Please enter a URL')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleWrite}>Write to NFC Tag</button>

      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <p>Tap NFC card to the device</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Basic styles for the modal (in-line for simplicity)
const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}

const modalContentStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
}
