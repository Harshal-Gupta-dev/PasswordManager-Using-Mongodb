import React, { useEffect, useState } from 'react'
import eyeIcon from '../icons/eye.svg';
import copy from '../icons/copy.svg';
import update from '../icons/update.svg';
import del from '../icons/delete.svg';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";



const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [savepassword, setSavepassword] = useState([])
    const [editid, setEditid] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let res = await req.json()
        setSavepassword(res);
    }


    useEffect(() => {
        getPassword()
    }, [])



    const handleSubmit = async () => {

        if (form.site.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
            alert("Your field is Empty!!! Please put the info into them")
            return;
        }
        if (editid) {
            let res = await fetch("http://localhost:3000/",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify({ ...form, id: editid })
                })
            const updatedarray = savepassword.map(item => {
                if (item.id === editid) {
                    return {
                        ...form,
                        id: item.id
                    }

                }
                return item;
            })
            setSavepassword(updatedarray)
            // localStorage.setItem("password", JSON.stringify(updatedarray))


            setEditid(null)
        }
        else {

            const newEntry = { ...form, id: uuidv4() }
            
            const updatedList = [...savepassword, newEntry]
            setSavepassword(updatedList)
            // localStorage.setItem("password", JSON.stringify(updatedList))

            let res = await fetch("http://localhost:3000/",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(newEntry)
                })

        }

        toast('Password Saved', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        })

        setForm({ site: "", username: "", password: "" })
    }

    // const handleSubmit = async () => {

    //     if (form.site.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
    //         alert("Your field is Empty!!! Please put the info into them")
    //         return;
    //     }

    //     if (editid) {
    //         // 1. Send the update request to backend
    //         let res = await fetch("http://localhost:3000/", {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "PUT",
    //             body: JSON.stringify({ ...form, id: editid })
    //         })

    //         // 2. Update frontend state
    //         const updatedarray = savepassword.map(item => {
    //             if (item.id === editid) {
    //                 return {
    //                     ...form,
    //                     id: item.id
    //                 }
    //             }
    //             return item;
    //         })
    //         setSavepassword(updatedarray)
    //         setEditid(null)
    //     }
    //     else {
    //         // FIX: Generate the UUID exactly ONCE so backend and frontend share the same ID
    //         const newId = uuidv4();
    //         const newPasswordEntry = { ...form, id: newId };

    //         // 1. Update frontend state
    //         const updatedList = [...savepassword, newPasswordEntry]
    //         setSavepassword(updatedList)

    //         // 2. Send the exact same object to the backend database
    //         let res = await fetch("http://localhost:3000/", {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify(newPasswordEntry)
    //         })
    //     }

    //     toast('Password Saved', {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         transition: Bounce,
    //     })

    //     setForm({ site: "", username: "", password: "" })
    // }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)

        toast('Text-Copied!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        })

    }

    const handleUpdate = (id) => {
        savepassword.find(item => {
            if (item.id == id) {
                setForm({
                    site: item.site,
                    username: item.username,
                    password: item.password
                });
            }
        })
        setEditid(id)
    }



    const handleDelete = async (id) => {
        let c = confirm("Do you want to Delete your Password")
        if (c) {
            

            
            let res = await fetch("http://localhost:3000/",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "DELETE",
                    body: JSON.stringify({id})
                })
            const data = savepassword.filter(item => item.id !== id)
            setSavepassword(data)
            localStorage.setItem("password", JSON.stringify(data))

            toast('Password Deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })

        }
    }


    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">  </div> */}
            <div className="min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <div className='myContainer w-[60vw]  mx-auto'>
                    <div className='flex flex-col mx-auto py-7 '>
                        <div className='px-2 mx-auto py-7 text-white'>
                            <span className='font-bold  text-2xl md:text-3xl'>&lt;</span>
                            <span className=' text-2xl md:text-3xl'>Password</span> <span className='text-purple-400  text-2xl md:text-3xl'>OP</span>
                            <span className='font-bold  text-2xl md:text-3xl' >/&gt;</span>
                            <p className=''>Your Own Password Manager</p>
                        </div>
                        {/* <p className=' mx-0 md:mx-1 text-white'>Your Own Password Manager</p> */}
                        <input onChange={handleChange} name='site' value={form.site} className=' w-full bg-white border border-black rounded-full pl-4 pr-12 py-1' type="text" placeholder='Enter your Website URL' />
                        <div className='flex flex-col md:flex-row gap-y-3 md:gap-x-3 py-4 w-full'>
                            <input onChange={handleChange} name='username' value={form.username} className=' w-full md:w-2/3 bg-white border border-black rounded-full px-4 py-1' type="text" placeholder='Enter Your Username' />
                            <div className="relative q-full md:w-1/3">
                                <input onChange={handleChange} name='password' value={form.password} className='w-full bg-white border border-black rounded-full pl-4 pr-12 py-1' type="password" placeholder='Enter your Password' />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-600 select-none">
                                    <img src={eyeIcon} alt="" />
                                </span>
                            </div>
                        </div>



                        <button onClick={handleSubmit} className='flex mx-auto items-center gap-x-2 bg-purple-500 text-white rounded-full px-6 py-2.5 cursor-pointer font-medium shadow-md transform transition-all ease-in-out duration-150 hover:bg-purple-600 hover:shadow-lg active:scale-95 active:translate-y-0.5 active:shadow-none'>
                            <span>{editid ? "Update" : "Submit"}</span>
                        </button>
                    </div>

                    <div>
                        <h1 className='text-white text-2xl font-bold py-2'>Your Passwords:</h1>
                    </div>
                    {savepassword.length === 0 && <div className='text-white font-bold text-center'>NO Password To Show!!!!</div>}
                    {savepassword.length != 0 &&
                        <div className='w-full overflow-x-auto rounded-xl shadow-xl border border-gray-300 bg-white'>
                            <table className="table-fixed min-w-[750px] w-full text-black border-collapse text-center text-sm md:text-base">

                                <thead className='bg-purple-500 font-bold text-white text-lg'>
                                    <tr>
                                        <th className='py-3 w-[28%]'>Website</th>
                                        <th className='py-3 w-[28%]'>User Name</th>
                                        <th className='py-3 w-[24%]'>Password</th>
                                        <th className='py-3 w-[20%]'>Action</th>
                                    </tr>
                                </thead>

                                <tbody className='bg-white text-black'>
                                    {savepassword.map((item, id) => {
                                        return (
                                            <tr key={id} className="hover:bg-purple-50/70 transition-colors duration-100 border-b border-gray-200">

                                                {/* Website Column */}
                                                <td className='text-center p-3 text-base border-r border-gray-200 font-medium text-purple-900'>
                                                    <div className='flex justify-between items-center px-2 gap-3'>
                                                        <a className="hover:underline text-purple-700 font-semibold truncate max-w-[160px]" href={item.site} target='_blank' rel="noreferrer">
                                                            {item.site}
                                                        </a>
                                                        <img className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 shrink-0" src={copy} alt="Copy URL" onClick={() => { handleCopy(item.site) }} />
                                                    </div>
                                                </td>

                                                {/* Username Column */}
                                                <td className='text-center p-3 text-base border-r border-gray-200 text-gray-800'>
                                                    <div className='flex justify-between items-center px-2 gap-3'>
                                                        <span className="truncate max-w-[160px]"> {item.username} </span>
                                                        <img className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 shrink-0" src={copy} alt="Copy Username" onClick={() => { handleCopy(item.username) }} />
                                                    </div>
                                                </td>

                                                {/* Password Column */}
                                                <td className='text-center p-3 text-base border-r border-gray-200 text-gray-800 font-mono tracking-wider'>
                                                    <div className='flex justify-between items-center px-2 gap-3'>
                                                        <span className="truncate max-w-[130px]">{item.password}</span>
                                                        <img className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 shrink-0" src={copy} alt="Copy Password" onClick={() => { handleCopy(item.password) }} />
                                                    </div>
                                                </td>

                                                {/* Action Column */}
                                                <td className='text-center p-3 text-base text-gray-800'>
                                                    <div className='flex justify-center items-center gap-5'>
                                                        <img src={update} className='w-5 h-5 cursor-pointer transition-transform hover:scale-110 active:scale-90' onClick={() => { handleUpdate(item.id) }} alt="Edit" />
                                                        <img src={del} className='w-5 h-5 cursor-pointer transition-transform hover:scale-110 active:scale-90' onClick={() => { handleDelete(item.id) }} alt="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Manager
