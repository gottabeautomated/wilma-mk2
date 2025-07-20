import EnvDebug from '../../components/EnvDebug';
export default function DebugPage() {
    return (<div style={{ padding: '20px' }}>
      <h1>Supabase Environment Debug</h1>
      <EnvDebug />
      <div style={{ marginTop: '20px' }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>Ensure all environment variables show ✅</li>
          <li>Restart development server</li>
          <li>Test Supabase connection</li>
        </ol>
      </div>
    </div>);
}
