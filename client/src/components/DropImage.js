import React, {Component} from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {Dimmer, Header, Icon, Image} from 'semantic-ui-react'
import '../css/cssgram.min.css'

const cssFilters= ["_1977","aden","brannan","brooklyn","clarendon","earlybird","gingham","hudson","inkwell","kelvin","lark","lofi","maven","mayfair","moon","nashville","perpetua","reyes","rise","slumber","stinson","toaster","valencia","walden","willow","xpro2"]

const styles={
  dropzoneContainer:{
    background: "white",
    width: "80%",
    color: "#333",
    padding: "10px",
    margin: "10px auto"
  },
  previewDiv:{
    display: "inline-block",
    padding: "10px",
    background: "white",
  },
  divFigure:{
    display: "inline-block",
    cursor:"pointer",
  },
  figure:{
    margin: "5px",
  },
  divFilters:{
    height:'150px',
    overflow:'auto',
  },
  h4:{
    color:"black",
    marginBottom:0,
  },
  previewFigure:{
    display:"inline-block"
  },
  centered:{
    margin: "0 auto !important",
    background: "red"
  }
}

class UploadFile extends Component{
  constructor(props){
    super(props);
    this.state = {
      file:null,
      currentFilter: "",
      advanced: false,
      active: true,
    }
    this.onDrop = this.onDrop.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleAdvanced = this.handleAdvanced.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  // onDrop = async ([file])=>{
  //   // const response = await this.props.mutate({
  //   //   variables: { file }
  //   // })
    
  //   console.log(file);
  //   this.setState({file})
  // }
  onDrop = async (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(element => {
      // console.log('element',element);
      this.setState({file:element})
    });
    // let aux = acceptedFiles[0];
    // console.log('aux:',aux);
    // this.setState( {file:aux});
    // // this.setState({ acceptedFiles, rejectedFiles });
    // console.log(this.state);
  }
  handleFilterClick = (filter)=>{
    console.log(this.state);
    this.setState({currentFilter:filter})
  }
  handleAdvanced = (ev,{checked})=>{
    this.setState( {advanced: checked} )
  }
  handleClose = ()=>{
    console.log('handle cancel');
    this.setState({active:false})
  }

  render(){
    const {file, currentFilter, advanced, active} = this.state
    return (
      <div style={{width: "100%"}}>
        {/* <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        > */}
            {
              !file && (
                <Header as='h2' icon inverted style={styles.dropzoneContainer}>
                  <Dropzone 
                    accept="image/jpeg, image/png" 
                    onDrop={this.onDrop}
                    >
                                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()}
                    className={classNames('dropzone', {'dropzone--isActive': isDragActive})}>
                      <input {...getInputProps()} />
                      <p>Drop some files here</p>
                      <Icon name="upload" />
                    </div>
                  )}
                  </Dropzone>
                </Header>
              )
            }
            {
              file && (
                <div style={styles.previewDiv}>
                  <figure className={currentFilter} style={styles.previewFigure}>
                    <Image
                      src={URL.createObjectURL(file)}
                      size="medium"
                    />
                  </figure>
                  <div>
                    <Image.Group size="tiny" style={styles.divFilters}>
                      {
                        cssFilters.map((filter,i)=>(
                          <div key={i} style={styles.divFigure} onClick={()=>this.handleFilterClick(filter)}>
                            <h4 style={styles.h4}>{filter}</h4>
                            <figure className={filter} style={styles.figure}>
                              <Image
                                src={URL.createObjectURL(file)}
                              />
                            </figure>
                          </div>
                        ))
                      }
                    </Image.Group>
                  </div>
                </div>
              )
            }
        {/* </Dimmer> */}
      </div>
    )
  }
}


export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`)(UploadFile)