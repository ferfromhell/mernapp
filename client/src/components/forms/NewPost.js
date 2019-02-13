import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react';
import DrawArea from '../DrawArea';
import DropImage from '../DropImage';


export default  ({styles, handleSubmit}) =>{
    const args={}
    const handleChange = (ev, input)=>{
        args[input.name] = input.value
        console.log(args);
    }

    return (
      <div>
        <div>
            <h3>New Post</h3>
            <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                <Form.Field>
                    <Form.Input type="text" name="tittle" onChange={handleChange} placeholder='Tittle'/>
                    <Form.Input name="text" onChange={handleChange} type="text" placeholder='Message'/>
                </Form.Field>
                <Form.Group widths='equal'>
                    <DrawArea/>
                    <DropImage/>
                </Form.Group>
                <Button type='submit' primary fluid>Post</Button>
            </Form>
        </div>
      </div>
    )
  }
