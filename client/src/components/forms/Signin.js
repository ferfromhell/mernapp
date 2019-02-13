import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'


export default  ({styles, handleClick, handleSubmit}) =>{
    const args={}

    const handleChange = (ev, input)=>{
        args[input.name] = input.value
        // console.log(args);
    }
    return (
      <div>
        <div  style={styles.box}>
            <h3>Sign in</h3>
            <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                <Form.Field>
                    <Form.Input type="email" name="email" onChange={handleChange} placeholder='Email' icon={<Icon name="mail" size="large" />} />
                </Form.Field>
                <Form.Field>
                    <Form.Input name="password" onChange={handleChange} type="password" placeholder='Password' icon={<Icon name="remove circle" size="large" />} />
                </Form.Field>
                <Button type='submit' primary fluid>Sign in</Button>
            </Form>
        </div>
        <div  style={styles.box}>
            Not registered? <Button inverted color="red" onClick={handleClick}>Sign up</Button>
        </div>
      </div>
    )
  }
