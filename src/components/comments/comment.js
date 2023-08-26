import React, { useState } from 'react';
import '../../assets/styles/comment.scss'
import { useSelector } from 'react-redux';
import UserLogo from "../../assets/images/user.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import EditComment from './editComment';
import { format } from 'date-fns';
import adminLogo from '../../assets/images/admin2.png';


export function Comment () {
    const [comments, setComments] = useState([
        { comment: "Welcome to the Lego Movie website", id: Math.random(), times: new Date(), userImage: adminLogo, userName: 'Admin1 ✔' },
        { comment: "Nice", id: Math.random(), times: new Date(), userImage: UserLogo, userName: 'User' },
        { comment: "Good Movie", id: Math.random(), times: new Date(), userImage: UserLogo, userName: 'User' },
        { comment: "Waow good", id: Math.random(), times: new Date(), userImage: UserLogo, userName: 'User' },
    ]);
    const [commentText, setCommentText] = useState("");
    const [focusTextarea, setFocusTextarea] = useState(false);
    const { userData } = useSelector( store => ({
        userData: store.dataReducer.userData
    }) )
    const [editComment, setEditComment] = useState(-1);

    function handleAddComment() {
        const newUserImage = userData.Username === 'Admin1' ? adminLogo : comments.userImage || UserLogo;
        const newUserName = userData.Username === 'Admin1' ? userData.Username + " ✔" : userData.Username ? userData.Username : comments.userName;
        if (commentText.trim() !== '') {
            const newComment = {
                comment: commentText,
                id: Math.random(),
                times: new Date(),
                userImage: newUserImage,
                userName: newUserName
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    }

    function handleCommentButton () {
       return setFocusTextarea(true)
    }

    function handleChanelButton () {
        return (
            setFocusTextarea(false),
            setCommentText("")
        )
    }

    function handleComment (e) {
        setCommentText(e.target.value)
    }
    
    function handleEdit (id) {
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === id) {
                return { ...comment, edited: true };
            } else {
                return comment;
            }
        }));
        setEditComment(id)
    }

    function handleDelete(id) {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    }

    function handleSettings (id) {
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === id) {
                return { ...comment, setting: !comment.setting };
            } else {
                return comment;
            }
        }))
    }
    return (
        <div className='comment_wrapper'>
            <h3>Comments</h3>
            <div className='textarea_container'>
                <textarea
                    className='textarea'
                    rows="4" 
                    cols="50" 
                    value={commentText}
                    onChange={(e) => handleComment(e)}
                    onFocus={handleCommentButton}
                ></textarea>
                {
                    focusTextarea
                    ?
                        <div className="send_comment">
                            <button onClick={handleChanelButton}>Chanel</button>
                            <button onClick={handleAddComment}>Comment</button>
                        </div>
                    :
                    ""
                }
            </div>
            <div className="comments">
                <h4 style={{color: "#fff", marginBottom: 20}}>Comment field</h4>
                {
                    comments.map((comment) => (
                        editComment === comment.id
                        ? 
                        <div key={comment.id}>
                            <EditComment
                                comment={comment} 
                                listComment={comments} 
                                setCommentList={setComments} 
                                saveEdit={() => setEditComment(-1)}
                            />
                        </div>
                        :
                        <div className="commentList" key={comment.id}>
                            <div className='user_comments'>
                                <div className="comment_userImage">
                                    <img src={comment.userImage} alt="" />
                                </div>
                                <div className='comment_text_cont'>
                                    <div className="comment_user">
                                        <strong>{comment.userName || "User"}</strong>
                                        <p className="comment_times">
                                            {
                                                comment.edited
                                                ? "(Edited) " + format(comment.times, "MM-dd-yyyy hh:mm")
                                                : format(comment.times, "MM-dd-yyyy hh:mm")
                                            }
                                        </p>
                                    </div>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                            <div className="comment_settings">
                                <div className="setting_button">
                                <button className='setting_btn' onClick={() => handleSettings(comment.id)}><FontAwesomeIcon icon={faEllipsis} /></button>
                                </div>
                                {
                                    comment.setting &&
                                        <div className="comment_setting_box">
                                            <button onClick={() => handleEdit(comment.id)}>Edit</button>
                                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                        </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

