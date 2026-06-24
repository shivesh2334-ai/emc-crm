export default function LeadTable({leads}:{leads:any[]}){
 return (
  <table>
   <thead><tr><th>Name</th><th>Status</th></tr></thead>
   <tbody>
    {leads.map((l)=><tr key={l.id}><td>{l.name}</td><td>{l.status}</td></tr>)}
   </tbody>
  </table>
 )
}
