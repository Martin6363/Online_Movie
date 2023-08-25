import React from 'react'
import '../../assets/styles/comment.scss'

export default function EditComment({ comment, listComment, setCommentList, saveEdit }) {

    function handleTextarea (e) {
        const newComment = listComment.map((comm) => (
            comm.id === comment.id ? {...comm, [e.target.name] : e.target.value} : comm
        ))
        setCommentList(newComment)
    }
    
    function handleCheckSaveValue () {
      if (comment.comment.trim() !== '') {
          saveEdit()
      }
    }

  return (
    <div className='textarea_container'>
      <textarea
            className='textarea'
            name='comment'
            rows="4" 
            cols="50" 
            value={comment.comment}
            onChange={handleTextarea}
        ></textarea>
        <div className="edit_button_cont">
          <button onClick={() => handleCheckSaveValue()} className='save_button'>Save</button>
        </div>
    </div>
  )
}
