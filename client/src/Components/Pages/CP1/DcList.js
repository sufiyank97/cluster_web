import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './cp1.css'
import axios from '../../../config/axios'
import swal from 'sweetalert';
import ClusterForm1 from './form1'
import Cookies from 'js-cookie'
const DcList = ({ Dcs, envs, sh, history }) => {
    const [dcsData, getDcsData] = useState([])
    const [show, setShow] = useState(false)
    const [fakeId, getId] = useState('')



    // get the Dcs list Data and call the function in Use Effect after page Render
    const callCp1 = async () => {

        const res = await axios.get('/platform/v1/cluster_list', {
            headers: {
                "x-auth": Cookies.get("token")
            }
        })
        try {
            const data = res.data

            let dc1 = data.filter(dc1 =>
                dc1.dcData.dc === Dcs && dc1.dcData.env === envs
            )

            getDcsData(dc1)
        }
        catch (err) {
            if (Cookies.get('token')) {
                swal('Error!', err.toString(), 'error')
            } else {
                history.push('/login')
            }
        }
    }
    //Call the Dcs Function in UseEffect
    useEffect(
        () => {
            callCp1()
        }, [Dcs, envs]
    )


    //Delete Cluster Record
    const handleDelete = (id) => {
        const deleteData = async (id) => {
            const res = await axios.delete(`/platform/v1/cluster_list/${id}`, {
                headers: {
                    "x-auth": Cookies.get('token')
                }
            })
            try {
                if (res.errors) {
                    swal('Error!', res.errors.toString(), 'error')
                } else {
                    getDcsData(dcsData.filter(d1 => d1._id !== id))
                }
            } catch (err) {
                if (Cookies.get('token')) {
                    swal('Error!', err.toString(), 'error')
                } else {
                    history.push('/login')
                }
            }
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    deleteData(id)
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    //get the updated Cluster Record to update
    const handleUpdate = async (id) => {
        getId(id)
        setShow(true)
    }

    //Close the Create Modal Box Form to create Cluster
    const handleClose = () => {
        setShow(false)
        callCp1()
        getId('')
    }

    return (
        <>

            <table className="table" >
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Date Created</th>
                        <th>Cluster Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {   // print all the Dcs data
                        dcsData.map((d1, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status === "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (d1.status === "created") ? (
                                            <label className="pro1 progress3">Created</label>
                                        ) :
                                                (
                                                    <label className="pro1 progress2">Updated</label>
                                                )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1._id)}>Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>

            <div style={{ marginLeft: '30em' }}>
                <Button className="createCluster mb-2" variant="warning" onClick={() => setShow(true)}>
                    Create Cluster</Button>
            </div>
            {/* Modal Box to Show Cluster Development and Production Form */}
            <Modal show={show} onHide={() => { setShow(false); getId('') }} size="lg" dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <ClusterForm1 handleClose={handleClose} Dcs={Dcs} envs={envs} id={fakeId} />
                </Modal.Body>
            </Modal>
        </ >

    )
}
export default DcList



// {   //Updated record form
//     (updatedRecord._id) ? (
//         <tr key={updatedRecord._id}>
//             <td>
//                 <input className="form-control" name="clusterName" defaultValue={updatedRecord.clusterName} ref={register({ required: true })} />
//             </td>
//             <td>
//                 <select id="status" name="status"
//                     ref={register({ required: true })} defaultValue={updatedRecord.status} className="form-control">
//                     {(updatedRecord.status === "inprogress") ? (
//                         <>
//                             <option value={updatedRecord.status}>{updatedRecord.status}</option>
//                             <option value="updated">updated</option>
//                             <option value="created">created</option>
//                         </>
//                     ) : (updatedRecord.status === "created") ? (
//                         <>
//                             <option value={updatedRecord.status}>{updatedRecord.status}</option>
//                             <option value="updated">updated</option>
//                             <option value="inprogress">inprogress</option>
//                         </>
//                     ) : (
//                                 <>
//                                     <option value={updatedRecord.status}>{updatedRecord.status}</option>
//                                     <option value="created">created</option>
//                                     <option value="inprogress">inprogress</option>
//                                 </>
//                             )}
//                 </select>
//             </td>
//             <td>
//                 <select id="networkPolicy" name="networkPolicy"
//                     ref={register({ required: true })} className="form-control">

//                     <option value={updatedRecord.networkPolicy._id}>{updatedRecord.networkPolicy.name}</option>
//                     {
//                         networkPolicy.filter(n1 => n1._id !== updatedRecord.networkPolicy._id).map((n1, i) => {
//                             return (
//                                 <option key={i + 1} value={n1._id}>{n1.name}</option>
//                             )
//                         })
//                     }
//                 </select>
//             </td>
//             <td>
//                 <textarea rows="2" id="role" name="role" defaultValue={updatedRecord.role.join(';')}
//                     ref={register({ required: true })} className="form-control" />
//             </td>
//             <td>
//                 <div className="btn-group" role="group" aria-label="Basic example">
//                     <button className="btn btn-primary"
//                         type="submit">Submit</button>
//                     <button type="button" className="btn btn-danger"
//                         onClick={() => handleCancel()}>Cancel</button>
//                 </div>

//             </td>
//         </tr>
//     ) : (
//             <tr></tr>
//         )
// }