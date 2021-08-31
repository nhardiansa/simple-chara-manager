export default function Table({className, data, handler}) {

  const onDeleteClick = (e) => {
    const id = e.target.id
    handler.deleteChara(id)
  }

  const onEditClick = (e) => {
    const id = e.target.id
    handler.getOneChara(id)
  }

  return (
    <div className={`overflow-x-auto `+className}>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th> 
            <th>Name</th> 
            <th>Email</th> 
            <th>Action</th>
          </tr>
        </thead> 
        <tbody>
          {
            data.map((el, index) => 
              <tr key={index}>
                <th>{index+1}</th> 
                <td>{el.name}</td> 
                <td>{el.email}</td> 
                <td>
                <button id={el.id} className="btn btn-warning btn-xs" onClick={onEditClick}>Edit</button>
                <button id={el.id} className="btn bg-red-700 btn-xs ml-2" onClick={onDeleteClick}>Hapus</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}