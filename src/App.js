import { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "./components/FormInput";
import Table from "./components/Table";

const BASE_URL = 'http://localhost:5000/chara'

function App() {
  const [data, setData] = useState([])
  const [singleData, setSingleData] = useState(null)
  const [trigger, setTrigger] = useState(true)

  useEffect(() => {
    if (trigger) {
      const getChara = async () => {
        const result = await axios.get(BASE_URL)
        const data = result.data.data
        setData(data);
      }
      getChara()
      setTrigger(false)
    }
  },[trigger])

  const inputChara = (data) => {

    if (data.id) {
      axios.put(`${BASE_URL}/${data.id}`,data)
      .then((res) => {
        const response = res.data.status
        setTrigger(true)
        alert(response)
      })
      .catch((err) => {
        alert('gagal mengedit data')
        console.log(err)
        setTrigger(true)
      })
    } else {
      axios.post(BASE_URL,data)
        .then((res) => {
          const response = res.data.status
          setTrigger(true)
          alert(response)
        })
        .catch((err) => {
          alert('gagal menambahkan data')
          console.log(err)
          setTrigger(true)
        })
    }
  }

  const deleteChara = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then((res) => {
        const response = res.data.status
        setTrigger(true)
        alert(response)
      })
      .catch((err) => {
        alert('gagal menghapus data')
        console.log(err)
        setTrigger(true)
      })
  }

  const getOneChara = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/${id}`)
      const data = result.data.data
      setSingleData(data);
    } catch (err) {
      alert('gagal menghapus data')
      console.log(err)
    }
  }

  return (
    <div className="container flex flex-col items-center">
      <h1 className="my-4 font-bold text-xl text-white">My Chara Manager</h1>
      <FormInput handler={{inputChara, setSingleData}} data={singleData} />
      <Table
        handler={{deleteChara, getOneChara}}
        data={data}
        className="mt-4 p-4 bg-white rounded-lg min-w-[33%]"
      />
    </div>
  );
}

export default App;
