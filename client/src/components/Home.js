import React,{Component} from 'react';
// import {Redirect} from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { delete_cookie } from 'sfcookies'
import { Button, Icon, Label, Menu, Segment,Card, Confirm, Tab, Modal, Form, TextArea } from 'semantic-ui-react';
// import {Button} from '@material-ui/core';
// import { withStyles,Fab } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import Login from './Login';
// import Register from './Register';

import NewPost from './forms/NewPost';
import DrawArea from './DrawArea';
import DropImage from './DropImage';

const styles={
    newPostButton:{
        position: "fixed",
        bottom: "10px",
        right: "10px"
    }
};
const GET_POSTS = gql`
    query{
        allPosts{
        tittle
        by{
            username
        }
        text
        vote
        }
    }
`;
const cardItem = (post,i) => {
    return (<Card key={i}>
        <Card.Content>
          <Card.Header>{post.tittle}</Card.Header>
          <Card.Meta>{post.by.username}</Card.Meta>
          <Card.Description>
              {post.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button as='div' labelPosition='right'>
                <Button icon>
                    <Icon name='heart' />
                    Vote
                </Button>
                <Label as='a' basic pointing='left'>
                    {post.vote}
                </Label>
            </Button>
        </Card.Content>
      </Card>)
}
const PostGroup = () => (
    <Query query={GET_POSTS}>
      {({ data,loading, error}) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
            // console.log(data.allPosts);
        return (
            <Card.Group>
                {data.allPosts.map(cardItem)}
            </Card.Group>
        )
      }}
    </Query>
)
const panes = [
    { menuItem: 'Text', render: () =>  <Form>
                                            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                                        </Form> },
    { menuItem: 'Draw', render: () => <DrawArea/> },
    { menuItem: 'Image', render: () => <DropImage/> },
  ]
  
const NewPostTabs = () => <Tab panes={panes} />
//Original tabs
// const NewPostModal = () => (
//   <Modal centered={false} trigger={<Button icon='plus' style={styles.newPostButton} /> }>
//     <Modal.Header>New Post!</Modal.Header>
//     <Modal.Content>
//       <NewPostTabs/>
//     </Modal.Content>
//   </Modal> 
// );
const NewPostModal = () => (
    <Modal centered={false} trigger={<Button icon='plus' style={styles.newPostButton} /> }>
      <Modal.Content scrolling={true}>
        <NewPost/>
      </Modal.Content>
    </Modal> 
  );


const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      path
      filename
    }
  }
`;

const UploadFile = () => {
  return (   
    <Mutation mutation={UPLOAD_FILE}>
      {uploadFile => (
        <input type="file" required onChange={({ target: { validity, files: [file] } }) =>{
            console.log(file, uploadFile)
          validity.valid && uploadFile({ variables: { file } });}
          }
       />
      )}
    </Mutation>
  );
};



class Home extends Component{
    state = { visible: false, isOpen:false, activeItem: 'home' }

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

    //
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    //
    show = () => {
        this.setState({ isOpen: true });
        console.log('click show');
    };
    handleConfirm = () => {
        this.setState({ isOpen: false });
        delete_cookie('tokenbbs');
        localStorage.removeItem('tokenbbs');
        console.log('click ok',this.state);
        this.props.history.push('/login');
    };
    handleCancel = () => this.setState({ isOpen: false });
    render(){
        const {isOpen, activeItem} = this.state;
        return (
            <div>
            <Menu pointing>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as='a' onClick={this.show}>
                    <Icon name='sign-out' />
                    Sign out
                    <Confirm open={isOpen} onCancel={this.handleCancel} onConfirm={this.handleConfirm} />
                </Menu.Item>
            </Menu>
            <Segment basic>
                {/* <DropImage/> */}
                <PostGroup/>
                <NewPostModal/>
            </Segment>
            </div>
        );
    }
}

export default Home;