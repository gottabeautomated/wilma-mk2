export default function EnvDebug() {
  const urlExists = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const keyExists = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: urlExists && keyExists ? '#d1fae5' : '#fef2f2',
      border: `2px solid ${urlExists && keyExists ? '#10b981' : '#ef4444'}`,
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h2>🔍 Environment Variables Status</h2>
      <div>
        <strong>SUPABASE_URL:</strong> {urlExists ? '✅ Set' : '❌ Missing'}
      </div>
      <div>
        <strong>SUPABASE_KEY:</strong> {keyExists ? '✅ Set' : '❌ Missing'}
      </div>
      {process.env.NEXT_PUBLIC_SUPABASE_URL && (
        <div style={{ fontSize: '12px', marginTop: '8px' }}>
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </div>
      )}
    </div>
  )
} 