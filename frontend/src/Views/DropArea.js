import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

export default class DropArea extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        acceptedFiles={['application/zip']}
        maxFileSize={50000000}
        dropzoneText="Drag and drop an Zip file here or click"
        onChange={this.handleChange.bind(this)}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview={true}
        filesLimit={1}
      />
    )
  }
}
