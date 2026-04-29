import { createClient } from '@/utils/supabase/server'

export default async function SupabaseTest() {
  const supabase = await createClient()
  
  let status = 'Checking...'
  let errorMsg = null

  try {
    // Mencoba melakukan query sederhana (misalnya auth session atau health check)
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
    
    // Note: '_test_connection' mungkin tidak ada, tapi jika error-nya bukan network error, 
    // berarti koneksi ke Supabase berhasil (Supabase merespon).
    
    if (error && error.code === 'PGRST116') {
        // Table not found but reachable
        status = 'Connected (Table not found, but API is reachable)'
    } else if (error) {
        status = 'Error'
        errorMsg = error.message
    } else {
        status = 'Connected Successfully'
    }
  } catch (e: any) {
    status = 'Failed to connect'
    errorMsg = e.message
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Supabase Connection Test</h1>
      <div style={{ 
        padding: '1rem', 
        borderRadius: '8px', 
        backgroundColor: status.includes('Connected') ? '#d4edda' : '#f8d7da',
        color: status.includes('Connected') ? '#155724' : '#721c24',
        border: `1px solid ${status.includes('Connected') ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <strong>Status:</strong> {status}
      </div>
      {errorMsg && (
        <pre style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eee', borderRadius: '4px' }}>
          {errorMsg}
        </pre>
      )}
      <div style={{ marginTop: '2rem' }}>
        <a href="/">Back to Home</a>
      </div>
    </div>
  )
}
