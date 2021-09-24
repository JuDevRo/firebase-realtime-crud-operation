import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import '../styles/AddEdit.css'
import {toast} from "react-toastify"
import fireDb from "../firebase"

const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState)
    const [data, setData] = useState({})

    const {name, email, contact} = state

    const history = useHistory()

    const {id} = useParams()

    useEffect(() => {
        fireDb.child("contacts").on("value", (snapshot) => {
            if(snapshot.val()!== null) {
                setData({...snapshot.val()})
            } else {
                setData({})
            }
        })

        return () => {
            setData({})
        }
    }, [id])

    useEffect(() => {
        if(id) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }

        return () => {
            setState({...initialState})
        }
    }, [id, data])
    
    const handleInputChange =  (e) => {
        const {name, value} = e.target
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact) {
            toast.error("Please provide value in each input field")
        } else {
            if(!id) {
                fireDb.child("contacts").push(state, (err) => {
                    if(err) {
                        toast.error(err)
                    } else {
                        toast.success("Contact Added Succesfully")
                    }
                })
            } else {
                fireDb.child(`contacts/${id}`).set(state, (err) => {
                    if(err) {
                        toast.error(err)
                    } else {
                        toast.success("Contact Updated Succesfully")
                    }
                })
            }
            setTimeout(() => history.push("/"), 500)
        }
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name..." value={name || ""} onChange={handleInputChange} /><br/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email..." value={email || ""} onChange={handleInputChange} /><br/>
                <label htmlFor="contact">Contact</label>
                <input type="number" id="contact" name="contact" placeholder="Your Contact..." value={contact || ""} onChange={handleInputChange} /><br/>

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    )
}

export default AddEdit