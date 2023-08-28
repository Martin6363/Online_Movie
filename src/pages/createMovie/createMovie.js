import React, { useState } from 'react'
import '../../assets/styles/createMovie.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../store/movieList/movie.action';


export function CreateMovie () {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [originalTitle, setOriginalTitle] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseData, setReleaseData] = useState("")
    const [voteAverage, setVoteAverage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    function handleOriginalTitle (e) {
        setOriginalTitle(e.target.value);
    }

    function handleTitle (e) {
        setTitle(e.target.value);
    }

    function handleDescription (e) {
        setDescription(e.target.value)
    }

    function handleDataRelease (e) {
        setReleaseData(e.target.value)
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file ? file.name : '');
    }

    function handleVoteAverage (e) {
        setVoteAverage(e.target.value)
    }

    function handleCreateMovie() {
        const newMovie = {
            id: Math.random(),
            original_title: originalTitle,
            title: title,
            release_date: releaseData,
            vote_average: voteAverage,
            overview: description,
            poster_img: selectedFile ? URL.createObjectURL(selectedFile) : ''
        };
        const checkValid = (originalTitle.trim() && title.trim() && description.trim() && releaseData && voteAverage)
        if ((checkValid) !== "") {
            dispatch(addMovie([newMovie]))
            setOriginalTitle("");
            setTitle("");
            setDescription("");
            setSelectedFile(null);
            navigate('/home');
        }
      }
    

  return (
    <div className='create_movie_wrapper dark-background'>
        <div className="container">
            <div className="create_input_box">
                <input type="text" required placeholder='Original Title' onChange={handleOriginalTitle}/>
            </div>
            <div className="create_input_box">
                <input type="text" required placeholder='Title' onChange={handleTitle}/>
            </div>
            <div className="create_input_box">
                <input type="date" required placeholder='Release data' onChange={handleDataRelease}/>
            </div>
            <div className="create_input_box">
                <input type="text" required placeholder='Vote average' onChange={handleVoteAverage}/>
            </div>
            <div className="input_file_box">
                <input type="file" required onChange={handleFileChange} />
                <div className="custom-file-upload">
                    <FontAwesomeIcon className='fa-upload' icon={faCloudArrowUp} />
                    <p>{selectedFileName || 'Upload Image'}</p>
                </div>
            </div>
            <div className="create_input_box">
                <textarea rows={10}placeholder='Description' onChange={handleDescription}></textarea>
            </div>
            <button className='create-btn' onClick={handleCreateMovie}>Create Movie</button>
            <button className='chanel-btn'><Link to={'/home'}>Chanel</Link></button>
        </div>
    </div>
  )
}
