import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FixedSizeList} from "react-window";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


const UserIconUpload = (props) => {

    const [uploading, setUploading] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const removeImage = ()=>{setImages([])};

    const onChange = (e) =>{
        const files = Array.from(e.target.files)
        setUploading(true);
        console.log(files);

        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i, file)
        })

        console.log(formData);

    }

    const display = () => {
        if(uploading){
            return <p>uploading...</p>
        } else if (images.length > 0){
            return <img src={images.url} alt='' />
        } else {
            return <div >
                <input type='file' id='single' onChange={onChange} />
            </div>
        }

    }

    return (<Dialog open={props.open} onClose={props.close} fullWidth="true" maxWidth="md">
        <DialogTitle><Typography variant="h1" component="h1" color="secondary">Edit Profile Picture</Typography></DialogTitle>
        <DialogContent>
            <DialogContentText >
                {display(uploading,images)}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="secondary" style={{outline:'none'}}>
                <b> Close</b>
            </Button>
        </DialogActions>
    </Dialog>)
}

export default UserIconUpload;