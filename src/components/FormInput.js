import { useEffect, useState } from "react"


export default function FormInput({handler, data}) {

  const [input, setInput] = useState({
    name: "",
    email: ""
  })

  useEffect(() => {
    if (data) {
      setInput({
        id: data.id,
        name: data.name,
        email: data.email
      })
      handler.setSingleData(null)
    }
  },[data])

  const submitHandler = (e) => {
    const name = input.name
    const email = input.email
    e.preventDefault()
    handler.inputChara(input);
    setInput({
      name: "",
      email: ""
    })
  }

  const onChangeHandler = (e) => {
    const key = e.target.id
    const value = e.target.value

    setInput({
      ...input,
      [key]: value
    })
  }

  const cancelEditHandler = () => {
    setInput({
      name: "",
      email: ""
    })
  }

  return (
    <form className="form-control w-1/3 bg-white p-3 rounded-lg shadow" onSubmit={submitHandler}>
      <label className="label" htmlFor="name">
        <span className="label-text">Name</span>
      </label> 
      <input value={input.name} onChange={onChangeHandler} type="text" placeholder="Fill to add new chara name" id="name" className="input input-bordered" />

      {
        input.name && 
        <>
          <label className="label mt-4" htmlFor="email">
            <span className="label-text">Email</span>
          </label> 
          <input value={input.email} onChange={onChangeHandler} type="text" placeholder="Fill to add new chara email" id="email" className="input input-bordered" />
        </>
      }

      {input.email ? <button className="btn btn-primary mt-4" type="submit">Submit</button> : ''}

      { input.id ? <button className="btn bg-red-700 hover:bg-red-900 mt-4" type="submit" onClick={cancelEditHandler}>Cancel edit</button> : ''}
    </form>
  )
}