// import React, { useState, useEffect, useContext } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import * as eventActions from "../../store/event";
// import { useHistory } from "react-router-dom";
// import { Modal } from "../../context/Modal";
// import { TripContext } from '../../context/Trip';

// function NoteForm({closeModal}) {

//     const submitNote = () => {
//         setHasSubmitted(true)
//         if(errors.length > 0) return; 

//         const noteData = {}
//         noteData.note = note
//         noteData.tripId = tripId
//         // noteData.tripDate = tripDate
//         noteData.ownerId = trip.ownerId
        
//         console.log("THIS IS NOTE DATA", noteData)
        
//         dispatch(noteActions.postNote(noteData))
//             // .catch(async (res) => {
//             //     const data = await res.json();
//             //     if (data && data.errors) setErrors(data.errors);
//             // })
//     };


//     return (
//         <form 
//             className="new-note-form"
//             onSubmit={e => {
//                 e.preventDefault();
//                 submitNote();
//             }}>
//             <label className='label'>
//                 Note:
//             </label>
//             <input onChange={e => setNote(e.target.value)} type="text" className="new-note-text" placeholder="Add note text here..." value={note} />
//             <ul className="new-note-errors">
//                 {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <button className="new-note-submit" type='submit' >Submit Note</button>
//         </form>
//     );
// }
// export default NoteForm;